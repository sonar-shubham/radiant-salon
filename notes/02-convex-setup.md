# Convex Database Setup Notes

This document explains how Convex is integrated into the RadiantSalon application.

## Overview

Convex is used as the real-time database and backend. It provides automatic reactivity, serverless functions, and TypeScript-first development.

## Files Created/Modified

### 1. `convex/schema.ts` - Database Schema

Defines 9 tables for the application:

| Table | Purpose |
|-------|---------|
| `users` | User profiles linked to Clerk |
| `salons` | Salon profiles with WhatsApp config |
| `staff` | Staff members with schedules |
| `services` | Service catalog with pricing |
| `appointments` | Booking records |
| `clients` | Customer database |
| `transactions` | Payment records |
| `notifications` | WhatsApp message logs |
| `inventory` | Stock management |

### 2. `app/ConvexClientProvider.tsx` (Alternative to current setup)

For standalone Convex (without Clerk integration), create this file:

```typescript
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

### 3. Current Integration with Clerk

We're using `ConvexProviderWithClerk` in `src/providers/index.tsx`:

```typescript
import { ConvexProviderWithClerk } from "convex/react-clerk";
// This allows Convex to use Clerk's authentication
```

## Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_CONVEX_URL=https://YOUR_PROJECT.convex.cloud
```

## Commands

### Initialize Convex (first time)

```bash
npx convex dev
```

This will:
1. Prompt you to login (via GitHub)
2. Create a new project
3. Generate the `convex/_generated/` folder
4. Deploy your schema

### Re-initialize with existing project

If you lose your `.env.local` file:

```bash
npx convex dev --configure=existing --team YOUR_TEAM --project YOUR_PROJECT
```

For this project:
```bash
npx convex dev --configure=existing --team sonar-shubham --project radiant-backend
```

### Deploy only

```bash
npx convex deploy
```

## Convex Dashboard

Access at: https://dashboard.convex.dev

Features:
- View and edit data directly
- Monitor function logs
- Manage deployments
- Configure settings

## Using Convex in Components

### Query Data

```typescript
"use client";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function MyComponent() {
  const appointments = useQuery(api.appointments.list);
  return <div>{appointments?.length} appointments</div>;
}
```

### Mutate Data

```typescript
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function CreateButton() {
  const create = useMutation(api.appointments.create);
  return <button onClick={() => create({ ... })}>Create</button>;
}
```

## Clerk + Convex JWT Template

For authentication to work between Clerk and Convex:

1. Go to Clerk Dashboard → JWT Templates
2. Create a new template named "convex"
3. Set the issuer to your Clerk frontend API URL
4. Copy the JWT template to Convex Dashboard → Settings → Authentication

## Your Convex Project Info

- **Team**: sonar-shubham
- **Project**: radiant-backend
- **Preview Deploy Key**: `preview:sonar-shubham:radiant-backend|eyJ2MiI6Ijg2NjU3MDMzZmI1OTRlYmFhOWZlY2NhOTU5MWNhMmVkIn0=`
- **Team ID**: 373232
- **Access Token**: (stored in .env.local)

## Next Steps

1. Run `npx convex dev` to start the local backend
2. The schema will auto-deploy
3. Create query/mutation functions in `convex/` folder
4. Use Convex hooks in your components
