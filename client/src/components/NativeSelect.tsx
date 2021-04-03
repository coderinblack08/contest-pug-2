import React, { useState } from "react";

interface NativeSelectProps {
  label?: string;
  error?: boolean;
}

export const NativeSelect: React.FC<
  NativeSelectProps & React.ComponentPropsWithoutRef<"select">
> = ({ children, className, label, error = false, ...props }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      {!!label && (
        <label
          htmlFor={props.name}
          className={`relative inline-block mb-1 text-sm font-medium ${
            error ? "text-red-500" : focused ? "text-primary-500" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
      <select
        className={`px-3 text-sm focus:ring-primary-400 focus:border-primary-400 border-gray-200 block shadow-sm rounded ${className}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};
