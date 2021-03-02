import { useField } from "formik";
import { ExclamationCircleOutline } from "heroicons-react";
import React, { InputHTMLAttributes, ReactNode } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLTextAreaElement> & {
    label?: string | ReactNode;
    className?: string;
    name: string;
    textarea?: boolean;
    minimal?: boolean;
  };

export const Input: React.FC<InputFieldProps> = ({
  name,
  label,
  textarea = false,
  minimal = false,
  className,
  ...props
}) => {
  const [field, { error, touched }] = useField(name);
  const hasError = !!error;
  return (
    <div>
      {label ? (
        <label className="inline-block font-bold mb-1.5 text-sm">{label}</label>
      ) : null}
      {!textarea ? (
        <input
          className={
            minimal
              ? `bg-gray-800 border-b border-gray-700 px-1 py-1.5 focus:outline-none focus:border-blue-500 transition ${className}`
              : `placeholder-gray-500 block bg-gray-800 border border-gray-700 rounded px-3 py-1.5 focus:outline-none focus:ring w-full ${className}`
          }
          {...field}
          {...props}
        />
      ) : (
        <textarea
          className={`placeholder-gray-500 block bg-gray-800 border border-gray-700 rounded px-3 py-1.5 focus:outline-none focus:ring w-full h-32 ${className}`}
          {...field}
          {...props}
        />
      )}
      {touched && hasError ? (
        <div className="flex items-center mt-1.5 text-red-500">
          <ExclamationCircleOutline size={16} className="mr-1" />
          <p className="mb-0.5">{error}</p>
        </div>
      ) : null}
    </div>
  );
};
