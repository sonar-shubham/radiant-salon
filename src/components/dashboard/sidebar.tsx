"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Calendar,
    Users,
    UserCog,
    Scissors,
    Package,
    Receipt,
    BarChart3,
    Settings,
    LogOut,
    Sparkles,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Appointment", href: "/appointments", icon: Calendar },
    { name: "Walk-Ins", href: "/walk-ins", icon: Users },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Billing", href: "/billing", icon: Receipt },
    { name: "Engagement", href: "/engagement", icon: UserCog },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
];

interface DashboardSidebarProps {
    salonName?: string;
}

export function DashboardSidebar({ salonName = "My Salon" }: DashboardSidebarProps) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full w-64 bg-[#1e40af] text-white">
            {/* Logo */}
            <div className="flex items-center gap-2 px-4 py-4 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold">RadiantSalon</span>
            </div>

            {/* Salon Selector */}
            <div className="px-3 py-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-between text-white hover:bg-white/10 hover:text-white"
                        >
                            <span className="truncate">{salonName}</span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>Switch Salon</DropdownMenuItem>
                        <DropdownMenuItem>Add New Salon</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-white/20 text-white"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="px-3 py-4 border-t border-white/10">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg p-3 mb-3">
                    <p className="text-xs font-medium text-black/80">Powered by Mybilz</p>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:bg-white/10 hover:text-white"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
