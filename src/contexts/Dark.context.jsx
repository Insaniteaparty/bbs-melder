/**
 * @fileoverview Context provider for managing theme mode (dark/light) in the BBS Melder application.
 * Provides state management and persistence to localStorage for the theme preference.
 */

import { createContext, useContext, useState, useEffect } from "react";

/**
 * Context object for dark mode state and actions.
 * @type {React.Context}
 */
const DarkContext = createContext();

/**
 * localStorage key for persisting theme mode.
 * @constant {string}
 */
const STORAGE_KEY = "bbsMelder_theme";

/**
 * Custom hook to access the dark mode context.
 * Must be used within a DarkProvider.
 *
 * @returns {Object} Dark context value containing:
 *   - isDark: Boolean indicating if dark mode is active
 *   - toggleDark: Function to toggle between dark and light mode
 *
 * @throws {Error} If used outside of DarkProvider
 */
export const useDark = () => {
  const context = useContext(DarkContext);
  if (!context) {
    throw new Error("useDark must be used within DarkProvider");
  }
  return context;
};

/**
 * Provider component that manages dark mode and provides it to child components.
 * Automatically syncs state with localStorage for persistence across sessions.
 * Initializes with dark mode (true) if no previous preference exists.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 */
export const DarkProvider = ({ children }) => {
  /**
   * State tracking whether dark mode is enabled.
   * Initialized from localStorage if available, otherwise defaults to true (dark mode).
   * @type {[boolean, Function]}
   */
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(true));
      return true;
    }
    return JSON.parse(stored);
  });

  /**
   * Effect to persist theme preference to localStorage whenever it changes.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isDark));
  }, [isDark]);

  /**
   * Toggles between dark and light mode.
   */
  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  /**
   * Context value object containing the dark mode state and toggle function.
   * @type {Object}
   */
  const value = {
    isDark,
    toggleDark,
  };

  return <DarkContext.Provider value={value}>{children}</DarkContext.Provider>;
};
