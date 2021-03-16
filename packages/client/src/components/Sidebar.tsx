import React from "react";

interface SidebarProps {
  path: "dashboard" | "explore" | "competitions" | "direct-messages" | "integrations";
}

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <nav>
      <img src="/logo.svg" alt="Contest Pug" />
    </nav>
  );
};
