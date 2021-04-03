import { useField } from "formik";
import { Search, InfoCircle } from "react-iconly";
import React, { useState } from "react";
import { capitalize } from "../utils/capitalize";
import { Tooltip } from "./Tooltip";

type InputProps = {
  label?: string;
  search?: boolean;
  error?: boolean;
  textarea?: boolean;
  themeSize?: keyof typeof InputTheme.sizes;
  errorTooltip?: string;
} & React.ComponentPropsWithoutRef<"input">;

export const InputTheme = {
  sizes: {
    sm: "w-56",
    md: "w-80",
    lg: "w-96",
    full: "w-full",
    none: "",
  },
  colors: {
    error: "focus:ring-red-400 focus:border-red-400 ring-1 ring-red-400 border-red-400",
    normal: "focus:ring-primary-400 focus:border-primary-400 border-gray-200",
  },
};

export const Input: React.FC<InputProps> = ({
  label,
  search,
  errorTooltip,
  themeSize = "sm",
  onFocus,
  onBlur,
  error,
  textarea,
  className,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const inputProps = (input = true) => ({
    type: input ? props.type ?? "text" : undefined,
    className: `${InputTheme.colors[error ? "error" : "normal"]} block shadow-sm rounded-md ${
      search ? "pl-9" : "pl-3"
    } pr-3 text-sm rounded ${themeSize ? InputTheme.sizes[themeSize] : ""} ${
      textarea ? "h-32" : ""
    } ${className}`,
    onFocus: (e: any) => {
      onFocus && onFocus(e);
      setFocused(true);
    },
    onBlur: (e: any) => {
      onBlur && onBlur(e);
      setFocused(false);
    },
    ...props,
  });

  return (
    <div>
      {!!label && (
        <label
          htmlFor={props.name}
          className={`relative inline-flex items-center mb-1 text-sm font-medium ${
            error ? "text-red-500" : focused ? "text-primary-500" : "text-gray-700"
          }`}
        >
          {label}
          {!!errorTooltip && (
            <Tooltip tooltip={errorTooltip} tip={props.name + "-error-message"}>
              <InfoCircle set="bold" size={15} className="ml-1" />
            </Tooltip>
          )}
        </label>
      )}
      <div className="relative">
        {search && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              <Search size={16} />
            </span>
          </div>
        )}
        {React.createElement(textarea ? "textarea" : "input", inputProps(!textarea))}
      </div>
    </div>
  );
};

export const FormikInput: React.FC<InputProps & { name: string; useTooltip?: boolean }> = ({
  name,
  useTooltip,
  ...props
}) => {
  const [field, { error, touched }] = useField(name);

  return (
    <div className="space-y-1">
      <Input
        error={touched && !!error}
        errorTooltip={useTooltip && !!error ? error : undefined}
        {...field}
        {...props}
      />
      {!useTooltip && touched && !!error ? (
        <div className="flex items-center mt-1.5 text-red-500">
          <InfoCircle set="bold" size={15} className="mr-1 flex-shrink-0" />
          <p className="text-sm">{capitalize(error)}</p>
        </div>
      ) : null}
    </div>
  );
};
