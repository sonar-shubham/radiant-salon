import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User profiles linked to Clerk authentication
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("owner"), v.literal("manager"), v.literal("staff"), v.literal("admin")),
    salonId: v.optional(v.id("salons")),
    phone: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_salon", ["salonId"]),

  // Salon profiles with settings
  salons: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    logo: v.optional(v.string()),
    address: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    phone: v.string(),
    email: v.string(),
    website: v.optional(v.string()),
    timezone: v.string(),
    currency: v.string(),
    // WhatsApp configuration
    whatsapp: v.optional(v.object({
      phoneNumberId: v.string(),
      accessToken: v.string(),
      isVerified: v.boolean(),
    })),
    // Business hours
    businessHours: v.array(v.object({
      day: v.number(), // 0-6, Sunday-Saturday
      isOpen: v.boolean(),
      openTime: v.optional(v.string()),
      closeTime: v.optional(v.string()),
    })),
    // Subscription/billing
    subscriptionStatus: v.union(v.literal("trial"), v.literal("active"), v.literal("cancelled"), v.literal("expired")),
    subscriptionPlan: v.optional(v.string()),
    trialEndsAt: v.optional(v.number()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_subscription_status", ["subscriptionStatus"]),

  // Staff members
  staff: defineTable({
    userId: v.id("users"),
    salonId: v.id("salons"),
    title: v.string(), // e.g., "Senior Stylist"
    bio: v.optional(v.string()),
    specializations: v.array(v.string()),
    commission: v.optional(v.number()), // percentage
    workSchedule: v.array(v.object({
      day: v.number(),
      isWorking: v.boolean(),
      startTime: v.optional(v.string()),
      endTime: v.optional(v.string()),
      breakStart: v.optional(v.string()),
      breakEnd: v.optional(v.string()),
    })),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_salon", ["salonId"])
    .index("by_user", ["userId"]),

  // Service catalog
  services: defineTable({
    salonId: v.id("salons"),
    name: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    duration: v.number(), // in minutes
    price: v.number(),
    discountPrice: v.optional(v.number()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_salon", ["salonId"])
    .index("by_category", ["salonId", "category"]),

  // Appointments/Bookings
  appointments: defineTable({
    salonId: v.id("salons"),
    clientId: v.id("clients"),
    staffId: v.id("staff"),
    serviceId: v.id("services"),
    date: v.string(), // YYYY-MM-DD
    startTime: v.string(), // HH:MM
    endTime: v.string(), // HH:MM
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled"),
      v.literal("no_show")
    ),
    notes: v.optional(v.string()),
    totalAmount: v.number(),
    paidAmount: v.number(),
    paymentStatus: v.union(v.literal("pending"), v.literal("partial"), v.literal("paid"), v.literal("refunded")),
    reminderSent: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_salon", ["salonId"])
    .index("by_salon_date", ["salonId", "date"])
    .index("by_client", ["clientId"])
    .index("by_staff", ["staffId"])
    .index("by_status", ["salonId", "status"]),

  // Client database
  clients: defineTable({
    salonId: v.id("salons"),
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.string(),
    gender: v.optional(v.union(v.literal("male"), v.literal("female"), v.literal("other"))),
    dateOfBirth: v.optional(v.string()),
    address: v.optional(v.string()),
    notes: v.optional(v.string()),
    tags: v.array(v.string()),
    totalVisits: v.number(),
    totalSpent: v.number(),
    lastVisit: v.optional(v.number()),
    whatsappOptIn: v.boolean(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_salon", ["salonId"])
    .index("by_phone", ["salonId", "phone"])
    .index("by_email", ["salonId", "email"]),

  // Payment transactions
  transactions: defineTable({
    salonId: v.id("salons"),
    appointmentId: v.optional(v.id("appointments")),
    clientId: v.id("clients"),
    amount: v.number(),
    type: v.union(v.literal("payment"), v.literal("refund")),
    method: v.union(v.literal("cash"), v.literal("card"), v.literal("upi"), v.literal("wallet")),
    razorpayPaymentId: v.optional(v.string()),
    razorpayOrderId: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_salon", ["salonId"])
    .index("by_appointment", ["appointmentId"])
    .index("by_client", ["clientId"])
    .index("by_razorpay_order", ["razorpayOrderId"]),

  // WhatsApp notification logs
  notifications: defineTable({
    salonId: v.id("salons"),
    clientId: v.id("clients"),
    appointmentId: v.optional(v.id("appointments")),
    type: v.union(
      v.literal("appointment_reminder"),
      v.literal("appointment_confirmation"),
      v.literal("appointment_cancelled"),
      v.literal("payment_receipt"),
      v.literal("promotional")
    ),
    channel: v.union(v.literal("whatsapp"), v.literal("sms"), v.literal("email")),
    templateName: v.optional(v.string()),
    messageContent: v.string(),
    status: v.union(v.literal("pending"), v.literal("sent"), v.literal("delivered"), v.literal("read"), v.literal("failed")),
    externalMessageId: v.optional(v.string()),
    errorMessage: v.optional(v.string()),
    sentAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_salon", ["salonId"])
    .index("by_client", ["clientId"])
    .index("by_appointment", ["appointmentId"]),

  // Inventory management
  inventory: defineTable({
    salonId: v.id("salons"),
    name: v.string(),
    sku: v.optional(v.string()),
    category: v.string(),
    quantity: v.number(),
    minQuantity: v.number(), // alert threshold
    unitPrice: v.number(),
    sellingPrice: v.optional(v.number()),
    supplier: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_salon", ["salonId"])
    .index("by_category", ["salonId", "category"]),
});
