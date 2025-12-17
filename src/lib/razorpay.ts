import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance (server-side only)
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Types for Razorpay orders
export interface CreateOrderParams {
    amount: number; // in smallest currency unit (paise for INR)
    currency?: string;
    receipt?: string;
    notes?: Record<string, string>;
}

export interface RazorpayOrder {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    created_at: number;
}

// Create a new order
export async function createOrder(params: CreateOrderParams): Promise<RazorpayOrder> {
    const order = await razorpay.orders.create({
        amount: params.amount,
        currency: params.currency || "INR",
        receipt: params.receipt || `receipt_${Date.now()}`,
        notes: params.notes,
    });
    return order as RazorpayOrder;
}

// Verify payment signature
export function verifyPaymentSignature(
    orderId: string,
    paymentId: string,
    signature: string
): boolean {
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(body.toString())
        .digest("hex");
    return expectedSignature === signature;
}

// Get payment details
export async function getPayment(paymentId: string) {
    return razorpay.payments.fetch(paymentId);
}

// Refund payment
export async function refundPayment(paymentId: string, amount?: number) {
    return razorpay.payments.refund(paymentId, {
        amount: amount,
    });
}
