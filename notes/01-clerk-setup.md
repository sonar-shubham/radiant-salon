# Clerk Integration - Updated Setup Notes

This document explains how Clerk authentication is integrated following the latest official pattern.

## Overview

Clerk provides user authentication using the App Router pattern with `clerkMiddleware()`.

## Files Created/Modified

### 1. `src/middleware.ts` - Clerk Middleware

```typescript
// middleware.ts - Clerk Middleware
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

**What it does:**
- Runs on every request matching the patterns
- Handles session validation automatically
- Does NOT block unauthenticated users by default
- Use `auth.protect()` inside routes to require authentication

### 2. `src/app/layout.tsx` - ClerkProvider

```typescript
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

**What it does:**
- Wraps the entire application with authentication context
- All child components can access Clerk hooks and components
- Works with both server and client components

## Environment Variables

Add to `.env.local`:

```env
# Get these from https://dashboard.clerk.com → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
```

## Setting Up Clerk Dashboard

1. Go to [clerk.com](https://clerk.com) and sign in
2. Create a new application (or select existing)
3. Go to **API Keys** in the sidebar
4. Copy **Publishable Key** and **Secret Key**
5. Paste into `.env.local`

## Using Clerk Components

### In the Landing Page or Header

```tsx
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

### In Server Components

```typescript
import { auth } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  return <div>Protected content</div>;
}
```

### In Client Components

```tsx
"use client";
import { useUser } from "@clerk/nextjs";

export function UserProfile() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return null;
  
  return <div>Hello, {user.firstName}!</div>;
}
```

## Current Configuration

- **Auth bypass**: "Start Free Trial" button goes directly to dashboard (for demo purposes)
- **No route protection**: Dashboard is currently accessible without login
- To enable protection, add route checks in the middleware or use `auth.protect()`

## Verification Checklist

✅ `clerkMiddleware()` used in `src/middleware.ts`
✅ `<ClerkProvider>` wraps app in `layout.tsx`
✅ Imports from `@clerk/nextjs` (client) and `@clerk/nextjs/server` (server)
✅ Using App Router pattern (not pages/ directory)
✅ Real keys only in `.env.local` (gitignored)

## Troubleshooting

### "Missing Clerk Publishable Key" error
- Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to `.env.local`
- Restart the dev server

### SignIn/SignUp not working
- Verify keys are correct in Clerk Dashboard
- Check browser console for errors
- Ensure `.env.local` has no typos

## Next Steps

1. Get Clerk API keys from dashboard
2. Add to `.env.local`
3. Restart dev server: `npm run dev`
4. Test sign up/sign in flows
