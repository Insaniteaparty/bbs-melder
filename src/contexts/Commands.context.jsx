/**
 * @fileoverview Context provider for managing discovered commands in the BBS Melder application.
 * Provides state management and persistence to localStorage for tracking which commands
 * the user has discovered and their quantities per character.
 */

import { createContext, useContext, useState, useEffect } from "react";
import { commands } from "../model/Commands.model";
import { useCharacter } from "./Character.context";

/**
 * Context object for commands state and actions.
 * @type {React.Context}
 */
const CommandsContext = createContext();

/**
 * localStorage key for persisting commands data.
 * @constant {string}
 */
const STORAGE_KEY = "bbsMelder_commands";

/**
 * Custom hook to access the commands context.
 * Must be used within a CommandsProvider.
 *
 * @returns {Object} Commands context value containing:
 *   - discoveredCommands: Object mapping command names to their data for the current character.
 *   - addCommand: Function to mark a command as discovered and increment its count.
 *   - removeCommand: Function to decrement a command's count, removing it if count reaches 0 and it is not discovered.
 *   - getCommandCount: Function to retrieve the current count of a command.
 *   - isCommandDiscovered: Function to check if a command is marked as discovered.
 *   - toggleCommandDiscovered: Function to toggle the discovered status of a command.
 *   - resetCommands: Function to clear all commands for the current character.
 *
 * @throws {Error} If used outside of CommandsProvider.
 */
export const useCommands = () => {
  const context = useContext(CommandsContext);
  if (!context) {
    throw new Error("useCommands must be used within CommandsProvider");
  }
  return context;
};

/**
 * Provider component that manages commands state and provides it to child components.
 * Automatically syncs state with localStorage for persistence across sessions.
 * Stores commands per character in a nested structure.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 */
export const CommandsProvider = ({ children }) => {
  const { character } = useCharacter();

  /**
   * State tracking all characters' command data.
   * Structure: { [Character]: { [CommandName]: { count: number, discovered: boolean } } }
   * Initialized from localStorage if available, otherwise starts as empty object.
   * @type {[Object, Function]}
   */
  const [allCommands, setAllCommands] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  /**
   * Helper function to remove a command entry and clean up empty character entries.
   * Removes command if discovered is false and count is 0.
   * Also removes character entry if no commands remain.
   *
   * @param {Object} prev - Previous state
   * @param {string} currentCharacter - Current character
   * @param {CommandName} commandName - Command to remove
   * @param {Object} prevCharacterCommands - Commands for current character
   * @returns {Object} Updated state
   */
  const removeEmptyCommand = (
    prev,
    currentCharacter,
    commandName,
    prevCharacterCommands
  ) => {
    const { [commandName]: _, ...restCommands } = prevCharacterCommands;

    // If no commands left for character, remove character entry entirely
    if (Object.keys(restCommands).length === 0) {
      const { [currentCharacter]: __, ...rest } = prev;
      return rest;
    }

    return {
      ...prev,
      [currentCharacter]: restCommands,
    };
  };

  /**
   * Current character's commands.
   * @type {Object.<CommandName, {count: number, discovered: boolean}>}
   */
  const characterCommands = allCommands[character] || {};

  /**
   * Effect to persist commands to localStorage whenever they change.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allCommands));
  }, [allCommands]);

  /**
   * Marks a command as discovered and increments its count by 1.
   * If the command is not yet discovered, it starts at count 1 and discovered true.
   *
   * @param {CommandName} commandName - The enum value of the command to discover
   */
  const addCommand = (commandName) => {
    setAllCommands((prev) => {
      const prevCharacterCommands = prev[character] || {};
      const current = prevCharacterCommands[commandName] || {
        count: 0,
        discovered: false,
      };

      return {
        ...prev,
        [character]: {
          ...prevCharacterCommands,
          [commandName]: {
            count: current.count + 1,
            discovered: true,
          },
        },
      };
    });
  };

  /**
   * Decrements the count of a specific command by 1, down to 0.
   * Keeps the discovered status but reduces count.
   * Removes entry if count reaches 0 and discovered is false.
   *
   * @param {CommandName} commandName - The enum value of the command to remove
   */
  const removeCommand = (commandName) => {
    setAllCommands((prev) => {
      const prevCharacterCommands = prev[character] || {};
      const current = { ...prevCharacterCommands[commandName] };

      if (!current || current.count <= 0) {
        return prev;
      }

      current.count = Math.max(0, current.count - 1);

      // Remove entry if discovered is false and count is 0
      if (!current.discovered && !current.count) {
        return removeEmptyCommand(
          prev,
          character,
          commandName,
          prevCharacterCommands
        );
      }

      return {
        ...prev,
        [character]: {
          ...prevCharacterCommands,
          [commandName]: {
            ...current,
            count: current.count,
          },
        },
      };
    });
  };

  /**
   * Gets the current count of a specific command for the current character.
   *
   * @param {CommandName} commandName - The enum value of the command to query
   * @returns {number} The current count of the command (0 if not discovered)
   */
  const getCommandCount = (commandName) => {
    const command = characterCommands[commandName];
    return command ? command.count : 0;
  };

  /**
   * Checks if a command has been discovered for the current character.
   *
   * @param {CommandName} commandName - The enum value of the command to check
   * @returns {boolean} True if the command has been discovered
   */
  const isCommandDiscovered = (commandName) => {
    const command = characterCommands[commandName];
    return command ? command.discovered : false;
  };

  /**
   * Sets the discovered status of a command without affecting count.
   *
   * @param {CommandName} commandName - The enum value of the command
   */
  const toggleCommandDiscovered = (commandName) => {
    setAllCommands((prev) => {
      const prevCharacterCommands = prev[character] || {};
      const current = { ...prevCharacterCommands[commandName] };

      if (!current.count) current.count = 0;
      current.discovered = !current.discovered;

      // Remove entry if discovered is false and count is 0
      if (!current.discovered && !current.count) {
        return removeEmptyCommand(
          prev,
          character,
          commandName,
          prevCharacterCommands
        );
      }

      return {
        ...prev,
        [character]: {
          ...prevCharacterCommands,
          [commandName]: {
            ...current,
            discovered: current.discovered,
          },
        },
      };
    });
  };

  /**
   * Resets all commands for the current character, clearing their state.
   * This will also update localStorage to reflect the cleared state.
   */
  const resetCommands = () => {
    setAllCommands((prev) => ({
      ...prev,
      [character]: {},
    }));
  };

  /**
   * Context value object containing all state and actions.
   * @type {Object}
   */
  const value = {
    discoveredCommands: characterCommands,
    addCommand,
    removeCommand,
    getCommandCount,
    isCommandDiscovered,
    toggleCommandDiscovered,
    resetCommands,
  };

  return (
    <CommandsContext.Provider value={value}>
      {children}
    </CommandsContext.Provider>
  );
};
