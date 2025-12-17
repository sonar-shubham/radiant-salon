# Clerk Integration Setup Notes

This document explains how Clerk authentication is integrated into the RadiantSalon application.

## Overview

Clerk is used for user authentication and session management. The integration follows the latest App Router pattern from Clerk's official documentation.

## Files Created/Modified

### 1. `src/proxy.ts` - Middleware

This file handles authentication for all routes using Clerk's `clerkMiddleware()` function.

```typescript
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

**How it works:**
- The `clerkMiddleware()` function automatically handles session management
- The `matcher` config determines which routes the middleware runs on
- Static files and Next.js internals are excluded

### 2. `src/app/layout.tsx` - ClerkProvider

The root layout wraps the entire app with `<ClerkProvider>`:

```typescript
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

**How it works:**
- `ClerkProvider` provides authentication context to all components
- All child components can access Clerk hooks and components

## Environment Variables

Add these to your `.env.local` file (get keys from Clerk Dashboard):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
```

## Getting Clerk API Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application or select existing
3. Go to **API Keys** in the sidebar
4. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
5. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)
6. Paste into `.env.local`

## Clerk Components Used

```typescript
import {
  SignInButton,      // Button to open sign-in modal
  SignUpButton,      // Button to open sign-up modal
  UserButton,        // User avatar with menu
  SignedIn,          // Wrapper - shows children only when signed in
  SignedOut,         // Wrapper - shows children only when signed out
} from "@clerk/nextjs";
```

## Known Issues

- Clerk requires a valid publishable key to function
- Without keys, the app will work but authentication features won't function
- The "Start Free Trial" button currently bypasses auth and goes directly to dashboard

## Next Steps

1. Get your Clerk API keys from the dashboard
2. Add them to `.env.local`
3. Test sign-up and sign-in flows
4. Set up JWT template for Convex integration (see `02-convex-setup.md`)
