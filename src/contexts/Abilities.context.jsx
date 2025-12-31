/**
 * @fileoverview Context provider for managing user abilities in the BBS Melder application.
 * Provides state management and persistence to localStorage for tracking which abilities
 * the user has collected and their quantities per character.
 */

import { createContext, useContext, useState, useEffect } from "react";
import { abilities } from "../model/Abilities.model";
import { useCharacter } from "./Character.context";

/**
 * Context object for abilities state and actions.
 * @type {React.Context}
 */
const AbilitiesContext = createContext();

/**
 * localStorage key for persisting abilities data.
 * @constant {string}
 */
const STORAGE_KEY = "bbsMelder_abilities";

/**
 * Custom hook to access the abilities context.
 * Must be used within an AbilitiesProvider.
 *
 * @returns {Object} Abilities context value containing:
 *   - userAbilities: Object mapping ability names to their counts for current character
 *   - addAbility: Function to increment an ability count
 *   - removeAbility: Function to decrement an ability count
 *   - getAbilityCount: Function to get the current count of an ability
 *   - resetAbilities: Function to clear all abilities for a specific character
 *
 * @throws {Error} If used outside of AbilitiesProvider
 */
export const useAbilities = () => {
  const context = useContext(AbilitiesContext);
  if (!context) {
    throw new Error("useAbilities must be used within AbilitiesProvider");
  }
  return context;
};

/**
 * Provider component that manages abilities state and provides it to child components.
 * Automatically syncs state with localStorage for persistence across sessions.
 * Stores abilities per character in a nested structure.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 */
export const AbilitiesProvider = ({ children }) => {
  const { character } = useCharacter();

  /**
   * State tracking all characters' ability counts.
   * Structure: { [Character]: { [AbilityName]: count } }
   * Initialized from localStorage if available, otherwise starts as empty object.
   * @type {[Object, Function]}
   */
  const [allAbilities, setAllAbilities] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  /**
   * Current character's abilities.
   * @type {Object.<AbilityName, number>}
   */
  const userAbilities = allAbilities[character] || {};

  /**
   * Effect to persist abilities to localStorage whenever they change.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allAbilities));
  }, [allAbilities]);

  /**
   * Increments the count of a specific ability by 1, up to its limit.
   * Does nothing if the ability is already at its maximum limit.
   *
   * @param {AbilityName} abilityName - The enum value of the ability to add
   */
  const addAbility = (abilityName) => {
    setAllAbilities((prev) => {
      const characterAbilities = prev[character] || {};
      const currentCount = characterAbilities[abilityName] || 0;
      const ability = abilities[abilityName];

      if (currentCount < ability.limit) {
        return {
          ...prev,
          [character]: {
            ...characterAbilities,
            [abilityName]: currentCount + 1,
          },
        };
      }
      return prev;
    });
  };

  /**
   * Decrements the count of a specific ability by 1, down to 0.
   * Does nothing if the ability count is already 0.
   * Removes the ability from storage if count reaches 0.
   * Removes the character entry if they have no abilities left.
   *
   * @param {AbilityName} abilityName - The enum value of the ability to remove
   */
  const removeAbility = (abilityName) => {
    setAllAbilities((prev) => {
      const characterAbilities = prev[character] || {};
      const currentCount = characterAbilities[abilityName] || 0;

      if (currentCount > 1) {
        return {
          ...prev,
          [character]: {
            ...characterAbilities,
            [abilityName]: currentCount - 1,
          },
        };
      } else if (currentCount === 1) {
        const { [abilityName]: _, ...restAbilities } = characterAbilities;
        if (Object.keys(restAbilities).length === 0) {
          const { [character]: __, ...restAll } = prev;
          return restAll;
        }
        return {
          ...prev,
          [character]: restAbilities,
        };
      }
      return prev;
    });
  };

  /**
   * Gets the current count of a specific ability for the current character.
   *
   * @param {AbilityName} abilityName - The enum value of the ability to query
   * @returns {number} The current count of the ability (0 if not set)
   */
  const getAbilityCount = (abilityName) => {
    return userAbilities[abilityName] || 0;
  };

  /**
   * Resets the abilities for the provided character
   *
   * @param {Character} char
   */
  const resetAbilities = (char) => {
    setAllAbilities((prev) => ({
      ...prev,
      [char]: {},
    }));
  };

  /**
   * Context value object containing all state and actions.
   * @type {Object}
   */
  const value = {
    userAbilities,
    addAbility,
    removeAbility,
    getAbilityCount,
    resetAbilities,
  };

  return (
    <AbilitiesContext.Provider value={value}>
      {children}
    </AbilitiesContext.Provider>
  );
};
