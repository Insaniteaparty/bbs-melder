/**
 * DrawerContext provides a boolean state for whether the drawer is open.
 *
 * Exports:
 * - DrawerProvider: Context provider for the drawer state
 * - useDrawer: Hook to access { isDrawerOpen, setIsDrawerOpen }
 */
import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export function DrawerProvider({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  return (
    <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used within a DrawerProvider");
  return ctx;
}
