import React from "react";

export const Layout: React.FC = ({ children }) => (
  <main className="md:max-w-3xl max-w-2xl mx-auto px-5 py-10 md:py-12 2xl:py-20 overflow-auto">
    {children}
  </main>
);
