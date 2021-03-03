import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
}

const colors = {
  default: "focus:ring-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-900",
  transparent: "focus:ring-white text-white",
  blue: "focus:ring-blue-400 bg-blue-500 hover:bg-blue-600 text-white",
  red: "focus:ring-red-400 bg-red-500 hover:bg-red-600 text-white",
};

const sizes = {
  xs: "px-3 py-1 text-sm",
  iconSm: "px-1.5 py-1.5 text-sm",
  sm: "px-3 py-1.5 text-sm",
  md: "px-3 py-2",
  lg: "px-5 py-2",
};

export const Button: React.FC<ButtonProps> = ({
  href,
  className,
  children,
  color = "default",
  size = "md",
  leftIcon,
  ...props
}) => {
  const comp = (
    <button
      className={`inline-flex items-center transition focus:outline-none focus:ring-1 ${
        color !== "transparent"
          ? "focus:ring-offset-4 focus:ring-offset-gray-900"
          : ""
      } rounded ${colors[color]} ${sizes[size]} ${className}`}
      {...props}
    >
      {leftIcon && <div className="mr-1">{leftIcon}</div>}
      {children}
    </button>
  );
  if (href) {
    return <a href={href}>{comp}</a>;
  }
  return comp;
};
