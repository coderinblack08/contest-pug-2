import { Menu } from "@headlessui/react";
import { Placement } from "@popperjs/core";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "react-iconly";
import React from "react";
import { PropsOf } from "../types";
import { usePopper } from "../utils/usePopper";
import { spaces } from "./Button";

interface DropdownProps {
  children: React.ReactChild | React.ReactChild[];
  openButton: React.ReactNode;
  placement?: Placement;
  expand?: boolean;
  offset?: [number, number];
}

export const Dropdown: React.FC<DropdownProps> = ({
  openButton,
  children,
  expand,
  placement = "bottom-start",
  offset = [0, 0],
}) => {
  const [trigger, container] = usePopper({
    placement: placement,
    strategy: "fixed",
    modifiers: [{ name: "offset", options: { offset } }],
  });

  return (
    <div className={`relative z-50 inline-block text-left ${expand && "w-full"}`}>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button ref={trigger} as="div" className={expand ? "w-full" : undefined}>
              {openButton}
            </Menu.Button>
            <div ref={container}>
              <AnimatePresence>
                {open && (
                  <Menu.Items
                    as={motion.div}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: 1,
                      y: !placement.startsWith("bottom") ? "-0.5rem" : "0.5rem",
                    }}
                    exit={{ opacity: 0, y: 0 }}
                    className="w-56 py-2 bg-white border border-gray-100 rounded-xl shadow-lg outline-none opacity-0"
                    static
                  >
                    {children}
                  </Menu.Items>
                )}
              </AnimatePresence>
            </div>
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
          className={`mx-1.5 flex items-center px-2.5 py-2 rounded-lg text-sm focus:outline-none ${
            active ? "bg-gradient-to-b from-primary-400 to-primary-600 text-white" : "text-gray-600"
          } ${className}`}
        >
          {prefix && <div className={active ? "mr-auto" : spaces[spacing].prefix}>{prefix}</div>}
          {children}
          {(suffix || active) && (
            <div className={active ? "ml-auto" : spaces[spacing].prefix}>
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
