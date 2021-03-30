import React, { useState } from "react";
import { Switch as HeadlessSwitch } from "@headlessui/react";

export const Switch: React.FC<{ label?: string }> = ({ label }) => {
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <HeadlessSwitch.Group as="div" className="flex items-center space-x-2">
      {!!label && <HeadlessSwitch.Label className="text-gray-800">{label}</HeadlessSwitch.Label>}
      <HeadlessSwitch
        as="button"
        checked={switchValue}
        onChange={setSwitchValue}
        className={`${
          switchValue ? "bg-primary-500" : "bg-gray-200"
        } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
      >
        {({ checked }) => (
          <span
            className={`${
              checked ? "translate-x-5" : "translate-x-0"
            } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
          />
        )}
      </HeadlessSwitch>
    </HeadlessSwitch.Group>
  );
};
