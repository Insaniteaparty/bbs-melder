/**
 * @fileoverview Context provider for managing wishlist commands in the BBS Melder application.
 * Provides state management and persistence to localStorage for tracking commands the user
 * wants to meld with their specific recipes and counts the ingredients needed.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useCharacter } from "./Character.context";
import { useCommands } from "./Commands.context";

/**
 * Context object for wishlist state and actions.
 * @type {React.Context}
 */
const WishlistContext = createContext();

/**
 * localStorage key for persisting wishlist data.
 * @constant {string}
 */
const STORAGE_KEY = "bbsMelder_wishlist";

/**
 * Custom hook to access the wishlist context.
 * Must be used within a WishlistProvider.
 *
 * @returns {Object} Wishlist context value containing:
 *   - wishlistCommands: Object mapping command names to arrays of recipes for the current character.
 *   - ingredientCounts: Object mapping ingredient names to their counts needed.
 *   - addToWishlist: Function to add a command with a specific recipe to the wishlist.
 *   - removeFromWishlist: Function to remove a specific recipe by its ID.
 *   - isRecipeInWishlist: Function to check if a recipe is in the wishlist.
 *   - clearWishlist: Function to clear all wishlist entries for current character.
 *   - getWishlistCount: Function to get the total number of wishlist recipes.
 *
 * @throws {Error} If used outside of WishlistProvider.
 */
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};

/**
 * Provider component that manages wishlist state and provides it to child components.
 * Automatically syncs state with localStorage for persistence across sessions.
 * Stores wishlist per character in a nested structure.
 *
 * Structure: {
 *   [Character]: {
 *     [CommandName]: [
 *       { id: string, ingredients: [CommandName, CommandName], family: FamilyType, chance?: number }
 *     ]
 *   }
 * }
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 */
export const WishlistProvider = ({ children }) => {
  const { character } = useCharacter();
  const { getCommandCount } = useCommands();

  /**
   * State tracking all characters' wishlist data.
   * Structure: { [Character]: { [CommandName]: [Recipe] } }
   * Initialized from localStorage if available, otherwise starts as empty object.
   * @type {[Object, Function]}
   */
  const [allWishlists, setAllWishlists] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  /**
   * Ref to track the timeout for debounced localStorage writes.
   * @type {React.RefObject<number>}
   */
  const saveTimeoutRef = useRef();

  /**
   * Effect to persist wishlist state to localStorage whenever it changes.
   * Uses debouncing to avoid excessive writes.
   */
  useEffect(() => {
    // Clear any pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce the save operation
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allWishlists));
    }, 300);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [allWishlists]);

  /**
   * Get the current character's wishlist.
   * Memoized to only recalculate when character or wishlist changes.
   */
  const wishlistCommands = useMemo(() => {
    return allWishlists[character] || {};
  }, [allWishlists, character]);

  /**
   * Calculate ingredient counts based on all wishlist recipes.
   * Memoized to only recalculate when wishlist changes.
   */
  const ingredientCounts = useMemo(() => {
    const counts = {};

    Object.values(wishlistCommands).forEach((recipes) => {
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          counts[ingredient] = (counts[ingredient] || 0) + 1;
        });
      });
    });

    /* Subtract existing inventory counts from total counts
     * if count goes to zero or below, remove the ingredient from counts
     */
    Object.keys(counts).forEach((commandName) => {
      counts[commandName] -= getCommandCount(commandName);
      if (counts[commandName] <= 0) {
        delete counts[commandName];
      }
    });

    return counts;
  }, [wishlistCommands]);

  /**
   * Add a command with a specific recipe to the wishlist.
   *
   * @param {CommandName} command - The command to add to wishlist
   * @param {Object} recipe - The recipe object containing ingredients, family, and optional chance
   */
  const addToWishlist = (command, recipe) => {
    setAllWishlists((prev) => {
      const characterWishlist = prev[character] || {};
      const commandRecipes = characterWishlist[command] || [];

      return {
        ...prev,
        [character]: {
          ...characterWishlist,
          [command]: [
            ...commandRecipes,
            {
              id: recipe.id,
              ingredients: recipe.ingredients,
              family: recipe.family,
              chance: recipe.chance,
            },
          ],
        },
      };
    });
  };

  /**
   * Remove a specific recipe from a command in the wishlist by its ID.
   *
   * @param {CommandName} command - The command name
   * @param {string} recipeId - The unique recipe ID
   */
  const removeFromWishlist = (command, recipeId) => {
    setAllWishlists((prev) => {
      const characterWishlist = prev[character];
      if (!characterWishlist || !characterWishlist[command]) return prev;

      // Remove the recipe with matching ID
      const updatedRecipes = characterWishlist[command].filter(
        (recipe) => recipe.id !== recipeId
      );

      // If no recipes left for this command, remove the command
      if (updatedRecipes.length === 0) {
        const { [command]: _, ...restCommands } = characterWishlist;

        // If no commands left, remove character entry
        if (Object.keys(restCommands).length === 0) {
          const { [character]: __, ...rest } = prev;
          return rest;
        }

        return {
          ...prev,
          [character]: restCommands,
        };
      }

      return {
        ...prev,
        [character]: {
          ...characterWishlist,
          [command]: updatedRecipes,
        },
      };
    });
  };

  /**
   * Check if a specific recipe is in the wishlist.
   *
   * @param {CommandName} command - The command name
   * @param {string} recipeId - The unique recipe ID
   * @returns {boolean} True if the recipe is in the wishlist
   */
  const isRecipeInWishlist = (command, recipeId) => {
    const characterWishlist = allWishlists[character];
    if (!characterWishlist || !characterWishlist[command]) return false;

    return characterWishlist[command].some((recipe) => recipe.id === recipeId);
  };

  /**
   * Clear all wishlist entries for the current character.
   */
  const clearWishlist = () => {
    setAllWishlists((prev) => {
      const { [character]: _, ...rest } = prev;
      return rest;
    });
  };

  /**
   * Get the total number of wishlist recipes across all commands for the current character.
   *
   * @returns {number} The count of all wishlist recipes
   */
  const getWishlistCount = () => {
    return Object.values(wishlistCommands).reduce(
      (total, recipes) => total + recipes.length,
      0
    );
  };

  const value = {
    wishlistCommands,
    ingredientCounts,
    addToWishlist,
    removeFromWishlist,
    isRecipeInWishlist,
    clearWishlist,
    getWishlistCount,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
