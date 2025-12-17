# RadiantSalon - Modern Salon Management Platform

A comprehensive salon management solution built with Next.js, Clerk, Convex, and ShadCN UI.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- 📅 **Smart Scheduling** - Appointment booking with real-time availability
- 💬 **WhatsApp Notifications** - Automated reminders via WhatsApp Business API
- 💳 **UPI Payments** - Razorpay integration with UPI, cards, and wallets
- 👥 **Client Management** - Complete CRM with visit history
- 📊 **Real-Time Analytics** - Revenue tracking and insights
- 👨‍💼 **Staff Management** - Role-based access control
- 📦 **Inventory Tracking** - Stock management with alerts

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14+ (App Router) |
| UI | ShadCN UI + Tailwind CSS |
| Authentication | Clerk |
| Database | Convex (real-time) |
| Payments | Razorpay |
| Notifications | WhatsApp Business API |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Clerk account
- Convex account
- Razorpay account (for payments)
- Meta Business account (for WhatsApp)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/radiant-salon.git
   cd radiant-salon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys in `.env.local`

4. **Set up Clerk**
   - Create a Clerk application at [clerk.com](https://clerk.com)
   - Add your keys to `.env.local`
   - Create a JWT template for Convex in Clerk Dashboard

5. **Set up Convex**
   ```bash
   npx convex dev
   ```
   This will prompt you to log in and create a project.

6. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
radiant-salon/
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   │   └── ui/          # ShadCN UI components
│   ├── lib/             # Utility functions
│   ├── providers/       # Context providers
│   └── hooks/           # Custom React hooks
├── convex/              # Convex backend
│   ├── schema.ts        # Database schema
│   └── _generated/      # Auto-generated types
└── public/              # Static assets
```

## Environment Variables

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Convex
NEXT_PUBLIC_CONVEX_URL=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# WhatsApp
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx convex dev` | Start Convex development |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ by the RadiantSalon Team
