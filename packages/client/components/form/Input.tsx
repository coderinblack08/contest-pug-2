import { useField } from "formik";
import { ExclamationCircleOutline } from "heroicons-react";
import React, { InputHTMLAttributes, ReactNode } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLTextAreaElement> & {
    label?: string | ReactNode;
    name: string;
    textarea?: boolean;
  };

export const Input: React.FC<InputFieldProps> = ({
  name,
  label,
  textarea = false,
  ...props
}) => {
  const [field, { error, touched }] = useField(name);
  const hasError = !!error;
  return (
    <div>
      <label className="inline-block font-bold mb-1.5 text-sm">{label}</label>
      {!textarea ? (
        <input
          className="placeholder-gray-500 block bg-gray-800 border border-gray-700 rounded px-3 py-1.5 focus:outline-none focus:ring w-full"
          {...field}
          {...props}
        />
      ) : (
        <textarea
          className="placeholder-gray-500 block bg-gray-800 border border-gray-700 rounded px-3 py-1.5 focus:outline-none focus:ring w-full h-32"
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
