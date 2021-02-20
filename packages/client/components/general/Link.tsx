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
        unstyled ? null : "text-blue-300 hover:underline hover:text-blue-200"
      } cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
  if (isExternal) {
    return link;
  }
  return <NextLink href={href}>{link}</NextLink>;
};
