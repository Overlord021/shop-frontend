"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

export function DashboardSidebarProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useDashboardSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useDashboardSidebar must be inside DashboardSidebarProvider");
  return ctx;
}
