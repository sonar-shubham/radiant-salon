"use client";

import { Bell, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
    userName?: string;
}

export function DashboardHeader({ userName = "User" }: DashboardHeaderProps) {
    return (
        <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
            {/* Left: Title */}
            <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            {/* Center: Filters */}
            <div className="flex items-center gap-4">
                <Select defaultValue="today">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
            </div>

            {/* Right: Search, Notifications, Profile */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-10 w-64"
                    />
                </div>

                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                </Button>

                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                            {userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
