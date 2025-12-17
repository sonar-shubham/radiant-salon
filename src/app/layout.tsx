import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RadiantSalon - Modern Salon Management Platform",
  description: "All-in-one salon management solution with booking, payments, WhatsApp notifications, and real-time analytics.",
  keywords: ["salon management", "booking system", "appointment scheduling", "beauty salon", "spa management"],
  authors: [{ name: "RadiantSalon" }],
  openGraph: {
    title: "RadiantSalon - Modern Salon Management Platform",
    description: "All-in-one salon management solution with booking, payments, WhatsApp notifications, and real-time analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
