import React from "react";
import { Menu } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

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
                  className="absolute left-0 w-56 py-2 px-1.5 bg-white border border-gray-100 rounded-lg shadow-lg outline-none opacity-0"
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

interface DropdownItemProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  spacing?: number;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  className,
  spacing = 2,
  prefix,
  suffix,
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href="#"
          className={`flex items-center whitespace-nowrap px-2.5 py-1 rounded-lg text-slate-dark ${
            active && "bg-primary-100 text-primary-500"
          } ${className}`}
        >
          {prefix && <div className={`mr-${spacing}`}>{prefix}</div>}
          {children}
          {suffix && <div className={`mr-${spacing}`}>{suffix}</div>}
        </a>
      )}
    </Menu.Item>
  );
};
