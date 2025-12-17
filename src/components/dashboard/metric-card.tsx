import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
    variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const variantStyles = {
    default: "bg-white border-gray-200",
    primary: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-amber-50 border-amber-200",
    danger: "bg-red-50 border-red-200",
};

export function MetricCard({
    title,
    value,
    icon: Icon,
    trend,
    className,
    variant = "default",
}: MetricCardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border p-4 shadow-sm",
                variantStyles[variant],
                className
            )}
        >
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">{title}</p>
                {Icon && (
                    <div className="rounded-lg bg-gray-100 p-2">
                        <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                )}
            </div>
            <div className="mt-2">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {trend && (
                    <p
                        className={cn(
                            "text-xs mt-1",
                            trend.isPositive ? "text-green-600" : "text-red-600"
                        )}
                    >
                        {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last period
                    </p>
                )}
            </div>
        </div>
    );
}

// Action Card for quick actions
interface ActionCardProps {
    title: string;
    value: string | number;
    color: "red" | "yellow" | "orange" | "cyan" | "green";
    onClick?: () => void;
}

const actionColors = {
    red: "bg-red-500 hover:bg-red-600",
    yellow: "bg-yellow-400 hover:bg-yellow-500",
    orange: "bg-orange-500 hover:bg-orange-600",
    cyan: "bg-cyan-500 hover:bg-cyan-600",
    green: "bg-green-500 hover:bg-green-600",
};

export function ActionCard({ title, value, color, onClick }: ActionCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "rounded-lg p-4 text-white text-center transition-colors w-full",
                actionColors[color]
            )}
        >
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs mt-1 opacity-90">{title}</p>
        </button>
    );
}
