import React from "react";

export const ButtonTheme = {
  sizes: {
    sm: "px-4 py-2 text-xs rounded-md",
    md: "px-6 py-2.5 text-sm rounded-md",
    lg: "px-8 py-2.5 text-base rounded-md",
  },
  colors: {
    default: "bg-white border border-gray-100 text-gray-800 hover:bg-gray-50 focus:ring-gray-50",
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

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: keyof typeof ButtonTheme.colors;
  size?: keyof typeof ButtonTheme.sizes;
  secondary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  color = "primary",
  secondary = false,
  className,
  children,
  ...props
}) => {
  const getColor = () => {
    const variants = ButtonTheme.colors[color];
    if (color === "default" || color === "transparent") {
      return variants;
    }
    return variants[secondary ? "secondary" : "primary"];
  };

  return (
    <button
      className={`transition focus:outline-none font-medium focus:ring-2 ${
        ButtonTheme.sizes[size]
      } ${getColor()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
