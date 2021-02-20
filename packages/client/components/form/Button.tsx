import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  className,
  children,
  ...props
}) => {
  const comp = (
    <button
      className={`transition focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-4 focus:ring-offset-gray-900 font-sans bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-3 rounded mt-8 ${className}`}
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
