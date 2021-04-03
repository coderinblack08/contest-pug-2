import Link from "next/link";
import React from "react";
import { Spinner } from "./Spinner";
import { Tooltip } from "./Tooltip";

export const ButtonTheme = {
  iconSizes: {
    xs: "p-1.5",
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  },
  sizes: {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-2.5 text-sm",
  },
  colors: {
    default: "bg-white border border-gray-200 text-gray-800 focus:ring-gray-100",
    black: "bg-gradient-to-b from-gray-700 to-gray-900 text-white",
    primary: {
      primary:
        "bg-gradient-to-b from-primary-400 to-primary-600 hover:bg-primary-600 text-white focus:ring-primary-200",
      secondary: "bg-primary-100 text-primary-500 focus:ring-primary-200",
    },
    red: {
      primary: "bg-gradient-to-b from-red-400 to-red-600 text-white focus:ring-red-200",
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
  tooltip?: string;
  tip?: string;
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
  tooltip,
  tip,
  href,
  colors,
  children,
  icon,
  ...props
}) => {
  const getColor = () => {
    const variants = ButtonTheme.colors[color];
    if (color === "default" || color === "transparent" || color === "black") {
      return variants;
    }
    return variants[secondary ? "secondary" : "primary"];
  };

  let baseButton = (
    <button
      className={`inline-flex items-center justify-center transition focus:outline-none font-medium focus:ring-2 ${
        ButtonTheme[icon ? "iconSizes" : "sizes"][size]
      } ${colors ? colors : getColor()} ${className} ${rounded ? "rounded-full" : "rounded-md"}`}
      {...props}
    >
      {loading && (
        <Spinner className="absolute" size={size === "sm" ? 2 : 4} black={color === "default"} />
      )}
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
      baseButton = <a href={href}>{baseButton}</a>;
    }
    baseButton = <Link href={href}>{baseButton}</Link>;
  }

  if (tooltip && tip) {
    baseButton = (
      <Tooltip tooltip={tooltip} tip={tip}>
        {baseButton}
      </Tooltip>
    );
  }

  return baseButton;
};
