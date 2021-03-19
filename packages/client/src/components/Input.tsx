import { SearchOutline } from "heroicons-react";
import React from "react";

type InputProps = {
  label?: string;
  search?: boolean;
  themeSize?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const InputTheme = {
  sizes: {
    sm: "w-48",
    md: "w-64",
    lg: "w-96",
  },
};

export const Input: React.FC<InputProps> = ({ label, search, themeSize = "sm", ...props }) => {
  return (
    <div>
      {!!label && (
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className={`${label ? "mt-1" : ""} relative`}>
        {search && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              <SearchOutline size={16} />
            </span>
          </div>
        )}
        <input
          type="text"
          className={`focus:ring-primary-500 focus:border-primary-500 block ${
            search ? "pl-9" : "pl-3"
          } pr-3 sm:text-sm border-gray-200 rounded-full ${
            themeSize ? InputTheme.sizes[themeSize] : ""
          }`}
          {...props}
        />
      </div>
    </div>
  );
};
