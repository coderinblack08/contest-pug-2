import React from "react";
import NextLink from "next/link";

interface LinkProps {
  href: string;
  className?: string;
  unstyled?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  unstyled,
}) => {
  const isExternal = href.startsWith("http");
  const link = (
    <a
      href={isExternal ? href : undefined}
      className={`${
        unstyled ? "" : "text-blue-400 hover:underline hover:text-blue-300"
      } cursor-pointer ${className}`}
      tabIndex={0}
    >
      {children}
    </a>
  );
  if (isExternal) {
    return link;
  }
  return <NextLink href={href}>{link}</NextLink>;
};
