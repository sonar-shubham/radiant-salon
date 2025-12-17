// WhatsApp Business API utility functions

import crypto from "crypto";

const WHATSAPP_API_URL = "https://graph.facebook.com/v18.0";

interface WhatsAppConfig {
    phoneNumberId: string;
    accessToken: string;
}

interface MessageTemplate {
    name: string;
    language: {
        code: string;
    };
    components?: Array<{
        type: string;
        parameters: Array<{
            type: string;
            text?: string;
        }>;
    }>;
}

interface SendMessageParams {
    to: string; // Phone number with country code (e.g., "919876543210")
    template?: MessageTemplate;
    text?: string;
}

// Get WhatsApp config from environment or database
function getConfig(customConfig?: WhatsAppConfig): WhatsAppConfig {
    return {
        phoneNumberId: customConfig?.phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID!,
        accessToken: customConfig?.accessToken || process.env.WHATSAPP_ACCESS_TOKEN!,
    };
}

// Send a template message
export async function sendTemplateMessage(
    params: SendMessageParams & { template: MessageTemplate },
    config?: WhatsAppConfig
): Promise<{ messageId: string; success: boolean }> {
    const { phoneNumberId, accessToken } = getConfig(config);

    const response = await fetch(
        `${WHATSAPP_API_URL}/${phoneNumberId}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to: params.to,
                type: "template",
                template: params.template,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("WhatsApp API Error:", data);
        throw new Error(data.error?.message || "Failed to send WhatsApp message");
    }

    return {
        messageId: data.messages?.[0]?.id || "",
        success: true,
    };
}

// Send a text message (requires 24-hour window)
export async function sendTextMessage(
    params: SendMessageParams & { text: string },
    config?: WhatsAppConfig
): Promise<{ messageId: string; success: boolean }> {
    const { phoneNumberId, accessToken } = getConfig(config);

    const response = await fetch(
        `${WHATSAPP_API_URL}/${phoneNumberId}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to: params.to,
                type: "text",
                text: {
                    preview_url: false,
                    body: params.text,
                },
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("WhatsApp API Error:", data);
        throw new Error(data.error?.message || "Failed to send WhatsApp message");
    }

    return {
        messageId: data.messages?.[0]?.id || "",
        success: true,
    };
}

// Pre-built message templates for salon use cases
export const MessageTemplates = {
    appointmentReminder: (
        clientName: string,
        serviceName: string,
        dateTime: string,
        salonName: string
    ): MessageTemplate => ({
        name: "appointment_reminder",
        language: { code: "en" },
        components: [
            {
                type: "body",
                parameters: [
                    { type: "text", text: clientName },
                    { type: "text", text: serviceName },
                    { type: "text", text: dateTime },
                    { type: "text", text: salonName },
                ],
            },
        ],
    }),

    appointmentConfirmation: (
        clientName: string,
        serviceName: string,
        dateTime: string,
        salonName: string,
        salonAddress: string
    ): MessageTemplate => ({
        name: "appointment_confirmation",
        language: { code: "en" },
        components: [
            {
                type: "body",
                parameters: [
                    { type: "text", text: clientName },
                    { type: "text", text: serviceName },
                    { type: "text", text: dateTime },
                    { type: "text", text: salonName },
                    { type: "text", text: salonAddress },
                ],
            },
        ],
    }),

    paymentReceipt: (
        clientName: string,
        amount: string,
        serviceName: string,
        transactionId: string
    ): MessageTemplate => ({
        name: "payment_receipt",
        language: { code: "en" },
        components: [
            {
                type: "body",
                parameters: [
                    { type: "text", text: clientName },
                    { type: "text", text: amount },
                    { type: "text", text: serviceName },
                    { type: "text", text: transactionId },
                ],
            },
        ],
    }),
};

// Verify webhook signature from Meta
export function verifyWebhookSignature(
    payload: string,
    signature: string,
    appSecret: string
): boolean {
    const expectedSignature = crypto
        .createHmac("sha256", appSecret)
        .update(payload)
        .digest("hex");
    return `sha256=${expectedSignature}` === signature;
}
