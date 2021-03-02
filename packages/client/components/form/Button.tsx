import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  color?: "default" | "blue";
}

const colors = {
  default: "focus:ring-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-900",
  blue: "focus:ring-blue-400 bg-blue-500 hover:bg-blue-600 text-white",
};

export const Button: React.FC<ButtonProps> = ({
  href,
  className,
  children,
  color = "default",
  ...props
}) => {
  const comp = (
    <button
      className={`transition focus:outline-none focus:ring-1 focus:ring-offset-4 focus:ring-offset-gray-900 font-bold py-2 px-3 rounded ${colors[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
  if (href) {
    return <a href={href}>{comp}</a>;
  }
  return comp;
};
