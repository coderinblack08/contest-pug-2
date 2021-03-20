import { useField } from "formik";
import { ExclamationCircleOutline, SearchOutline } from "heroicons-react";
import React, { useState } from "react";

type InputProps = {
  label?: string;
  search?: boolean;
  error?: boolean;
  themeSize?: keyof typeof InputTheme.sizes;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const InputTheme = {
  sizes: {
    sm: "w-56",
    md: "w-80",
    lg: "w-96",
    full: "w-full",
  },
  colors: {
    error: "focus:ring-red-400 focus:border-red-400 ring-1 ring-red-400 border-red-400",
    normal: "focus:ring-primary-400 focus:border-primary-400 border-gray-200",
  },
};

export const Input: React.FC<InputProps> = ({
  label,
  search,
  themeSize = "sm",
  onFocus,
  onBlur,
  error,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      {!!label && (
        <label
          htmlFor={props.name}
          className={`relative inline text-sm font-medium ${
            error ? "text-red-500" : focused ? "text-primary-500" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {search && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              <SearchOutline size={16} />
            </span>
          </div>
        )}
        <input
          type={props.type ?? "text"}
          className={`${InputTheme.colors[error ? "error" : "normal"]} block shadow-sm rounded-md ${
            search ? "pl-9" : "pl-3"
          } pr-3 text-sm rounded ${themeSize ? InputTheme.sizes[themeSize] : ""}`}
          onFocus={(e) => {
            onFocus && onFocus(e);
            setFocused(true);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
            setFocused(false);
          }}
          {...props}
        />
      </div>
    </div>
  );
};

export const FormikInput: React.FC<InputProps & { name: string }> = ({ name, ...props }) => {
  const [field, { error, touched }] = useField(name);

  return (
    <div className="space-y-1">
      <Input error={!!error} {...field} {...props} />
      {!!error && touched ? (
        <span className="flex items-center text-red-500 text-sm">
          <ExclamationCircleOutline size={16} className="mr-1" />
          {error}
        </span>
      ) : null}
    </div>
  );
};
