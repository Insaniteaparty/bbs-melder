/**
 * @fileoverview Context provider for managing the current character selection in the BBS Melder application.
 * Provides state management and persistence to localStorage for tracking which character
 * (Terra, Ventus, or Aqua) the user is currently playing as.
 */

import { createContext, useContext, useState, useEffect } from "react";
import { Character } from "../model/Characters.model";

/**
 * Context object for character state and actions.
 * @type {React.Context}
 */
const CharacterContext = createContext();

/**
 * localStorage key for persisting character selection.
 * @constant {string}
 */
const STORAGE_KEY = "bbsMelder_character";

/**
 * Custom hook to access the character context.
 * Must be used within a CharacterProvider.
 *
 * @returns {Object} Character context value containing:
 *   - character: The currently selected character (Character enum value)
 *   - setCharacter: Function to change the current character
 *
 * @throws {Error} If used outside of CharacterProvider
 */
export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within CharacterProvider");
  }
  return context;
};

/**
 * Provider component that manages character selection and provides it to child components.
 * Automatically syncs state with localStorage for persistence across sessions.
 * Initializes with Character.Terra if no previous selection exists.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 */
export const CharacterProvider = ({ children }) => {
  /**
   * State tracking the currently selected character.
   * Initialized from localStorage if available, otherwise defaults to Character.Terra.
   * @type {[Character, Function]}
   */
  const [character, setCharacter] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const defaultCharacter = Character.Terra;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCharacter));
      return defaultCharacter;
    }
    return JSON.parse(stored);
  });

  /**
   * Effect to persist character selection to localStorage whenever it changes.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
  }, [character]);

  /**
   * Context value object containing the character state and setter.
   * @type {Object}
   */
  const value = {
    character,
    setCharacter,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};
