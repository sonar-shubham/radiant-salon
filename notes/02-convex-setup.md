# Convex Database - Integration Notes

This document explains how Convex is integrated with your RadiantSalon project.

## Your Convex Project Info

| Field | Value |
|-------|-------|
| **Team** | sonar-shubham |
| **Project** | radiant-backend |
| **Team ID** | 373232 |
| **Dashboard** | https://dashboard.convex.dev |

## Files Created/Modified

### 1. `src/app/ConvexClientProvider.tsx`

```typescript
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

**What it does:**
- Creates a Convex client using the deployment URL
- Provides reactive data context to all components
- Must be a client component ("use client")

### 2. `src/app/layout.tsx`

The layout wraps children with ConvexClientProvider:

```typescript
<ClerkProvider>
  <html lang="en">
    <body>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </body>
  </html>
</ClerkProvider>
```

### 3. `convex/schema.ts`

Defines your database tables:
- `users` - User profiles
- `salons` - Salon information
- `staff` - Staff members
- `services` - Service catalog
- `appointments` - Bookings
- `clients` - Customer database
- `transactions` - Payment records
- `notifications` - Message logs
- `inventory` - Stock management

## Setup Commands

### Connect to Your Existing Project

Since you already have a Convex project, run:

```bash
npx convex dev --configure=existing --team sonar-shubham --project radiant-backend
```

This will:
1. Connect to your existing project
2. Create/update `.env.local` with `NEXT_PUBLIC_CONVEX_URL`
3. Sync your schema to the cloud
4. Start watching for changes

### Environment Variable

After running the command above, your `.env.local` will have:

```env
NEXT_PUBLIC_CONVEX_URL=https://YOUR_PROJECT_ID.convex.cloud
```

## Using Convex in Components

### Query Data (Real-time)

```tsx
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function AppointmentsList() {
  const appointments = useQuery(api.appointments.list);
  
  if (!appointments) return <div>Loading...</div>;
  
  return (
    <ul>
      {appointments.map(apt => (
        <li key={apt._id}>{apt.clientName}</li>
      ))}
    </ul>
  );
}
```

### Mutate Data

```tsx
"use client";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function CreateAppointmentButton() {
  const create = useMutation(api.appointments.create);
  
  const handleClick = async () => {
    await create({
      clientName: "John Doe",
      service: "Haircut",
      date: new Date().toISOString(),
    });
  };
  
  return <button onClick={handleClick}>Create Appointment</button>;
}
```

### Creating Query Functions

Create a file like `convex/appointments.ts`:

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("appointments").collect();
  },
});

export const create = mutation({
  args: {
    clientName: v.string(),
    service: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("appointments", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});
```

## Preview Deployments (for Vercel)

Your preview deploy key:
```
preview:sonar-shubham:radiant-backend|eyJ2MiI6Ijg2NjU3MDMzZmI1OTRlYmFhOWZlY2NhOTU5MWNhMmVkIn0=
```

Add this to Vercel as `CONVEX_DEPLOY_KEY` environment variable.

## Verification Checklist

- [ ] Run `npx convex dev` to connect to your project
- [ ] Verify `.env.local` has `NEXT_PUBLIC_CONVEX_URL`
- [ ] Check Convex Dashboard for your tables
- [ ] Test a query in a component

## Troubleshooting

### "NEXT_PUBLIC_CONVEX_URL is not defined"

Run the connect command:
```bash
npx convex dev --configure=existing --team sonar-shubham --project radiant-backend
```

### Schema not syncing

1. Check for TypeScript errors in `convex/schema.ts`
2. Run `npx convex dev` to see detailed errors
3. Fix any issues and the schema will auto-sync

### Data not updating in real-time

- Ensure component is wrapped with `ConvexClientProvider`
- Check that the query hook is at the top level of a client component
- Verify the component has "use client" directive

## Next Steps

1. Run: `npx convex dev --configure=existing --team sonar-shubham --project radiant-backend`
2. Create query/mutation functions in `convex/` folder
3. Use `useQuery` and `useMutation` in your components
4. Add authentication with Clerk+Convex JWT template
