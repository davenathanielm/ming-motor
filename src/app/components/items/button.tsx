// components/ui/Button.tsx
"use client";
import Link from "next/link";
import React from "react";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  variant ?: "default" | "submit" | "delete" | "back"; 
};

const getVariantStyle  = (variant : string) => {
    switch (variant){
        case "submit":
            return "bg-customBackgroundButton hover:bg-customBackgroundButton/80 px-4 text-white/90";
        case "delete":
            return "border border-red-500 hover:bg-red-500 hover:text-white/90 px-6 text-red-500 ";
        case "back":
            return "bg-gray-500 hover:bg-gray-600 text-white/90";
        default:
            return "bg-customBackgroundButton hover:bg-customBackgroundButtonHover text-white/90";
    }
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  href,
  className = "",
  ariaLabel = "button",
  type = "button",
  variant = "default",
}) => {
  const baseStyle ="px-3 py-2  font-bold rounded-lg hover:cursor-pointer";
  const variantStyle = getVariantStyle(variant);

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={`${baseStyle} ${variantStyle} ${className}`}>
        {title}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
