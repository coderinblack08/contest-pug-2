import React from "react";
import ReactTooltip, { Type } from "react-tooltip";

interface TooltipProps {
  tooltip: string | null;
  tip: string;
  place?: "top" | "bottom" | "left" | "right";
  type?: Type;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  tip,
  tooltip,
  type = "dark",
  place = "top",
}) => {
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
          type={type}
          className="shadow-2xl font-medium"
        >
          {tooltip}
        </ReactTooltip>
      )}
    </>
  );
};
