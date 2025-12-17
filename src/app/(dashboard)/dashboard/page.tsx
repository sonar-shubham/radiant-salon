"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard, ActionCard } from "@/components/dashboard/metric-card";
import {
    Receipt,
    IndianRupee,
    TrendingUp,
    Users,
    Calendar,
    MessageSquare,
    FileText
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Top Tabs */}
            <div className="flex gap-4 border-b">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                    Sales Insight
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Staff Insights
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Customer Insights
                </button>
            </div>

            {/* Primary Metrics */}
            <div className="grid grid-cols-4 gap-4">
                <MetricCard
                    title="Bill Count"
                    value="0"
                    icon={Receipt}
                    variant="primary"
                />
                <MetricCard
                    title="Total Bill Value"
                    value="₹0"
                    icon={IndianRupee}
                    variant="success"
                />
                <MetricCard
                    title="Average Bill Value"
                    value="₹0"
                    icon={TrendingUp}
                    variant="warning"
                />
                <MetricCard
                    title="Total Guests"
                    value="0"
                    icon={Users}
                />
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-5 gap-3">
                <ActionCard title="Cancelled Bill Report" value="0" color="red" />
                <ActionCard title="Pending Bill Report" value="0" color="yellow" />
                <ActionCard title="Walk Ins Number" value="0" color="orange" />
                <ActionCard title="Digital Feedback" value="0" color="cyan" />
                <ActionCard title="Advance Sales Order" value="0" color="green" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6">
                {/* Week Payments Chart */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium">
                            Week&apos;s Payment 📊
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 flex items-center justify-center">
                        <p className="text-gray-400">No Data Available</p>
                    </CardContent>
                </Card>

                {/* Hours/Staff Trend */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium">
                            Hours/Staff at Trend 📊
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 flex items-center justify-center">
                        <p className="text-gray-400">No Data Available</p>
                    </CardContent>
                </Card>
            </div>

            {/* More Charts */}
            <div className="grid grid-cols-2 gap-6">
                {/* Ad Metrics */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Ad Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 flex flex-col items-center justify-center">
                        <p className="text-gray-400">No Existing/Info Data</p>
                        <p className="text-xs text-gray-400 mt-1">Make some appointments for some data to appear</p>
                    </CardContent>
                </Card>

                {/* Revenue Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 flex items-center justify-center">
                        <div className="text-center">
                            <div className="flex items-end justify-center gap-4 h-32">
                                {/* Placeholder bar chart */}
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                    <div key={day} className="flex flex-col items-center">
                                        <div
                                            className={`w-8 ${i === 5 ? 'bg-amber-400 h-20' : 'bg-blue-200 h-4'} rounded-t`}
                                        />
                                        <span className="text-xs text-gray-400 mt-1">{day}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4 justify-center mt-3 text-xs">
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-blue-500 rounded" /> Sales
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-amber-400 rounded" /> Online Sales
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-2 gap-6">
                {/* Recent Sales */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium">Recent Sales</CardTitle>
                        <button className="text-sm text-blue-600 hover:underline">View all</button>
                    </CardHeader>
                    <CardContent className="h-48 flex flex-col items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-300 mb-2" />
                        <p className="text-gray-500 font-medium">No Sales Data</p>
                        <p className="text-xs text-gray-400 mt-1">Make some appointments for some data to appear</p>
                    </CardContent>
                </Card>

                {/* Today's Appointment */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium">Today&apos;s Appointment</CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 flex flex-col items-center justify-center">
                        <Calendar className="h-12 w-12 text-gray-300 mb-2" />
                        <p className="text-amber-600 font-medium">No Appointment Today</p>
                        <p className="text-xs text-gray-400 mt-1">Visit the schedule section to add some, begin their!</p>
                    </CardContent>
                </Card>
            </div>

            {/* Appointments & Booking Activity */}
            <div className="grid grid-cols-2 gap-6">
                {/* Upcoming Appointments */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium">Upcoming Appointments</CardTitle>
                        <button className="text-sm text-blue-600 hover:underline">View all</button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-8 mb-4 text-center">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                                <p className="text-xs text-gray-500">Total Slot</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                                <p className="text-xs text-gray-500">No. of Guests</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                                <p className="text-xs text-gray-500">Members</p>
                            </div>
                        </div>
                        <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                            <p className="text-gray-400 text-sm">No scheduled appointments</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Booking Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Booking Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className={`px-2 py-1 rounded text-xs font-medium ${i % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {i % 2 === 0 ? 'New' : 'Pending'}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        Hair Cut with REGUSR #HC{1200 + i}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date().toLocaleDateString()} • Salon appointment
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Top Services & Products */}
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium">Top Services</CardTitle>
                        <button className="text-sm text-blue-600 hover:underline">View all</button>
                    </CardHeader>
                    <CardContent className="h-32 flex flex-col items-center justify-center">
                        <p className="text-gray-500 font-medium">No Top Service Data</p>
                        <p className="text-xs text-gray-400">Make some sales for top service data to appear</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium">Top Products</CardTitle>
                        <button className="text-sm text-blue-600 hover:underline">View all</button>
                    </CardHeader>
                    <CardContent className="h-32 flex flex-col items-center justify-center">
                        <p className="text-gray-500 font-medium">No Top Product Data</p>
                        <p className="text-xs text-gray-400">Make some sales for top product data to appear</p>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Charts */}
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Staff Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="h-32 flex items-center justify-center">
                        <p className="text-gray-400">No Data Available</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Staff Revenue Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-32 flex items-center justify-center">
                        <p className="text-gray-400">No Data Available</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
