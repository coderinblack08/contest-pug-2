import React from "react";
import ReactTooltip from "react-tooltip";

interface TooltipProps {
  tooltip: string | null;
  tip: string;
  place?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({ children, tip, tooltip, place = "top" }) => {
  return (
    <>
      <div data-tip data-for={tip}>
        {children}
      </div>
      {tooltip && (
        <ReactTooltip
          id={tip}
          place={place}
          effect="solid"
          type="dark"
          className="shadow-2xl font-medium"
        >
          {tooltip}
        </ReactTooltip>
      )}
    </>
  );
};
