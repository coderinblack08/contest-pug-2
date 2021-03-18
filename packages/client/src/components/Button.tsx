import Link from "next/link";
import React from "react";
import { Spinner } from "./Spinner";

export const ButtonTheme = {
  iconSizes: {
    sm: "p-2",
    md: "p-3",
    lg: "p-5",
  },
  sizes: {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-2.5 text-base",
  },
  colors: {
    default: "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 focus:ring-gray-100",
    primary: {
      primary: "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-200",
      secondary: "bg-primary-100 text-primary-500 focus:ring-primary-200",
    },
    red: {
      primary: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-200",
      secondary: "bg-red-100 text-red-500 focus:ring-red-200",
    },
    transparent: "text-gray-800 bg-transparent",
  },
};

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: keyof typeof ButtonTheme.colors;
  size?: keyof typeof ButtonTheme.sizes;
  colors?: string;
  secondary?: boolean;
  loading?: boolean;
  rounded?: boolean;
  left?: React.ReactNode | JSX.Element;
  right?: React.ReactNode | JSX.Element;
  spacing?: 1 | 2 | 4 | 6;
  icon?: React.ReactNode | JSX.Element;
  href?: string;
};

export const spaces = {
  1: { prefix: "mr-1.5", suffix: "ml-1.5" },
  2: { prefix: "mr-2", suffix: "ml-2" },
  4: { prefix: "mr-4", suffix: "ml-4" },
  6: { prefix: "mr-6", suffix: "ml-6" },
};

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  color = "primary",
  secondary = false,
  loading = false,
  left,
  right,
  spacing = 1,
  className,
  rounded,
  href,
  colors,
  children,
  icon,
  ...props
}) => {
  const getColor = () => {
    const variants = ButtonTheme.colors[color];
    if (color === "default" || color === "transparent") {
      return variants;
    }
    return variants[secondary ? "secondary" : "primary"];
  };

  const baseButton = (
    <button
      className={`inline-flex items-center justify-center transition focus:outline-none font-medium focus:ring-2 ${
        ButtonTheme[icon ? "iconSizes" : "sizes"][size]
      } ${colors ? colors : getColor()} ${className} ${rounded ? "rounded-full" : "rounded-md"}`}
      {...props}
    >
      {loading && <Spinner className="absolute" size={size === "sm" ? 2 : 4} />}
      <div className={`flex items-center ${loading && "opacity-0"}`}>
        {left && <div className={spacing && spaces[spacing].prefix}>{left}</div>}
        {icon ? icon : children}
        {right && <div className={spacing && spaces[spacing].suffix}>{right}</div>}
      </div>
    </button>
  );
  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return <a href={href}>{baseButton}</a>;
    }
    return <Link href={href}>{baseButton}</Link>;
  }
  return baseButton;
};
