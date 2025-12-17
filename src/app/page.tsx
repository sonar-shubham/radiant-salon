import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  CreditCard,
  Smartphone,
  Clock,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                RadiantSalon
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-slate-400 hover:text-white transition-colors">Testimonials</a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[128px]" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-violet-500/20 text-violet-300 border-violet-500/30 hover:bg-violet-500/30">
            ✨ Now with WhatsApp Integration
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Manage Your Salon
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            All-in-one platform for appointments, payments, staff management, and customer engagement.
            Boost your salon&apos;s efficiency with real-time analytics and automated WhatsApp notifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-2xl shadow-violet-500/30 text-lg px-8 h-14">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 h-14">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
            {[
              { value: "10K+", label: "Active Salons" },
              { value: "1M+", label: "Appointments Booked" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to Run Your Salon
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powerful tools designed specifically for salon owners, managers, and staff.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Intelligent appointment booking with real-time availability, automated reminders, and conflict detection.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: MessageSquare,
                title: "WhatsApp Notifications",
                description: "Send booking confirmations, reminders, and promotions directly via WhatsApp Business API.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: CreditCard,
                title: "UPI Payments",
                description: "Accept payments via UPI, cards, and wallets with Razorpay integration. Track all transactions.",
                color: "from-violet-500 to-purple-500",
              },
              {
                icon: Users,
                title: "Client Management",
                description: "Complete client profiles with visit history, preferences, and automated follow-ups.",
                color: "from-orange-500 to-amber-500",
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description: "Dashboard with revenue tracking, booking trends, staff performance, and growth insights.",
                color: "from-pink-500 to-rose-500",
              },
              {
                icon: Shield,
                title: "Staff & Access Control",
                description: "Role-based permissions for owners, managers, and service providers with activity logs.",
                color: "from-indigo-500 to-blue-500",
              },
            ].map((feature, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/10">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Dashboard
            </h2>
            <p className="text-xl text-slate-400">
              Get a bird&apos;s eye view of your entire salon operations
            </p>
          </div>

          {/* Mock Dashboard Preview */}
          <div className="bg-slate-900/80 rounded-2xl border border-white/10 p-6 shadow-2xl">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: "Bill Count", value: "0", color: "bg-blue-500/20 text-blue-400" },
                { label: "Total Bill Value", value: "₹0", color: "bg-emerald-500/20 text-emerald-400" },
                { label: "Average Bill Value", value: "₹0", color: "bg-amber-500/20 text-amber-400" },
                { label: "Total Guests", value: "0", color: "bg-violet-500/20 text-violet-400" },
              ].map((metric, i) => (
                <div key={i} className={`rounded-xl p-4 ${metric.color}`}>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-70">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-3">
              {[
                { label: "Cancelled Bill Report", color: "bg-red-500" },
                { label: "Pending Bill Report", color: "bg-yellow-500" },
                { label: "Walk Ins Number", color: "bg-orange-500" },
                { label: "Digital Feedback", color: "bg-cyan-500" },
                { label: "Advance Sales Order", color: "bg-green-500" },
              ].map((action, i) => (
                <div key={i} className={`${action.color} rounded-lg p-3 text-center text-white text-sm font-medium`}>
                  <div className="text-xl font-bold">0</div>
                  <div className="text-xs mt-1">{action.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for small salons just getting started",
                features: [
                  "Up to 50 appointments/month",
                  "1 staff member",
                  "Basic analytics",
                  "Email support",
                ],
                cta: "Start Free",
                popular: false,
              },
              {
                name: "Professional",
                price: "₹1,999",
                period: "/month",
                description: "For growing salons with multiple staff",
                features: [
                  "Unlimited appointments",
                  "Up to 10 staff members",
                  "WhatsApp notifications",
                  "Advanced analytics",
                  "Priority support",
                  "UPI payments",
                ],
                cta: "Start Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For salon chains and franchises",
                features: [
                  "Multi-location support",
                  "Unlimited staff",
                  "Custom integrations",
                  "Dedicated account manager",
                  "SLA guarantee",
                  "API access",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, i) => (
              <Card key={i} className={`relative bg-white/5 border-white/10 ${plan.popular ? 'ring-2 ring-violet-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-400">{plan.period}</span>}
                  </div>
                  <CardDescription className="text-slate-400 mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500' : 'bg-white/10 hover:bg-white/20'}`}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Loved by Salon Owners
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                role: "Owner, Glamour Studio",
                content: "RadiantSalon transformed how we manage appointments. The WhatsApp reminders reduced no-shows by 60%!",
              },
              {
                name: "Rahul Verma",
                role: "Manager, Style Hub",
                content: "The real-time analytics help us make better decisions. Revenue tracking is incredibly accurate.",
              },
              {
                name: "Anita Patel",
                role: "Owner, Beauty Bliss",
                content: "UPI payments made checkout so smooth. Our customers love the convenience.",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
                    <div>
                      <div className="font-medium text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Transform Your Salon?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of salon owners who have streamlined their operations with RadiantSalon.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-2xl shadow-violet-500/30 text-lg px-10 h-14">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">RadiantSalon</span>
            </div>
            <div className="flex gap-8 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-slate-500">
              © 2024 RadiantSalon. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
