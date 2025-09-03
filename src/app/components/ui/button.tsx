import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  const base = "inline-flex items-center justify-center rounded-lg font-semibold transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-800",
    secondary: "bg-white border text-orange-500 hover:bg-gray-200",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};
