import { Menu } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "heroicons-react";
import React from "react";
import { PropsOf } from "../types";

interface DropdownProps {
  children: React.ReactChild | React.ReactChild[];
  openButton: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ openButton, children }) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="focus:outline-none">{openButton}</Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  as={motion.div}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: "0.5rem" }}
                  exit={{ opacity: 0, y: 0 }}
                  className="absolute left-0 w-56 py-2 bg-white border border-gray-100 rounded-xl shadow-lg outline-none opacity-0"
                  static
                >
                  {children}
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </div>
  );
};

type DropdownItemProps = {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  spacing?: number | "auto";
} & PropsOf<typeof Menu.Item>;

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  className,
  spacing = 1.5,
  prefix,
  suffix,
  ...props
}) => {
  return (
    <Menu.Item {...props}>
      {({ active }) => (
        <a
          href="#"
          className={`mx-1.5 flex items-center whitespace-nowrap px-2.5 py-2 rounded-lg text-sm ${
            active ? "bg-primary-500 text-white" : "text-gray-600"
          } ${className}`}
        >
          {prefix && <div className={`mr-${active ? "auto" : spacing}`}>{prefix}</div>}
          {children}
          {(suffix || active) && (
            <div className={`ml-${active ? "auto" : spacing}`}>
              {active ? <ChevronRight size={18} /> : suffix}
            </div>
          )}
        </a>
      )}
    </Menu.Item>
  );
};

export const DropdownDivider: React.FC = () => <div className="my-1 border-b border-gray-100" />;

export const DropdownLabel: React.FC = ({ children }) => (
  <p className="mx-1.5 px-2.5 py-1 font-bold text-sm font-display text-gray-700">{children}</p>
);
