import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-gray-900 text-white hover:bg-gray-800",
        variant === "outline" && "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
        variant === "ghost" && "text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}
