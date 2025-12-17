# Vercel Deployment Setup Notes

This document explains how to deploy RadiantSalon to Vercel.

## Overview

Vercel is used for hosting the Next.js frontend with automatic deployments from GitHub.

## Prerequisites

1. GitHub repository with your code
2. Vercel account
3. Vercel CLI (optional for local testing)

## Environment Variables for Vercel

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Convex
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud

# Razorpay
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_...

# WhatsApp
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_ACCESS_TOKEN=...
```

## Deployment Steps

### Option 1: Via Web UI

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Add environment variables
6. Click "Deploy"

### Option 2: Via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### Option 3: Via API Token

Use this for CI/CD or automated deployments:

```bash
# Set token as environment variable
export VERCEL_TOKEN=YOUR_TOKEN

# Deploy with token
vercel --token $VERCEL_TOKEN
```

## Your Vercel Configuration

- **Token Name**: AI IDE
- **Token**: (stored securely - see .env.local)
- **Team URL**: codesmiths-projects-754c2f9a
- **Expiration**: Never

## Vercel + Convex Integration

For preview deployments with Convex:

1. In Vercel Dashboard → Project Settings → Environment Variables
2. Add `CONVEX_DEPLOY_KEY` with your preview deploy key
3. Add build command: `npx convex deploy --cmd 'npm run build'`

Preview Deploy Key format:
```
preview:TEAM_NAME:PROJECT_NAME|KEY_STRING
```

## vercel.json (Optional)

Create if you need custom configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "regions": ["bom1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "@app_url"
  }
}
```

## Domain Configuration

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. SSL certificates are automatic

## Deployment Hooks

For automatic deploys from other services:

1. Go to Vercel Dashboard → Project → Settings → Git
2. Create a Deploy Hook
3. Use the URL to trigger deploys via HTTP POST

## Monitoring

- **Analytics**: Vercel provides built-in analytics
- **Logs**: View function logs in the dashboard
- **Speed Insights**: Performance monitoring

## Rollback

If a deployment has issues:

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

## Next Steps

1. Connect GitHub repository
2. Add environment variables
3. Deploy
4. Configure custom domain (optional)
5. Set up preview deployments for branches
