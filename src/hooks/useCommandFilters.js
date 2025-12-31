import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { familyMapper } from "../model/Crystals.model";
import { filterRecipes } from "../utils/recipe.utils";

/**
 * Custom hook to filter commands based on search query and filters.
 * Can work in two modes:
 * - Book mode (isBook=true): Shows all recipes, filtered only by ingredient/ability filters
 * - Planner mode (isBook=false): Shows only makeable recipes based on inventory
 *
 * @param {Array} commands - Array of command objects to filter
 * @param {string} searchQuery - Search string to match against command names
 * @param {Object} filters - Filter configuration object
 * @param {Function} getCommandCount - Function to get command counts
 * @param {Function} isCommandDiscovered - Function to check if command is discovered
 * @param {boolean} isBook - If true, shows all recipes. If false, only makeable ones.
 * @returns {Array} Filtered array of commands with filtered recipes
 */
export const useCommandFilters = (
  commands,
  searchQuery,
  filters,
  getCommandCount,
  isCommandDiscovered,
  isBook = false
) => {
  const { t } = useTranslation();

  return useMemo(() => {
    return commands
      .map((command) => {
        // Filter recipes for this command
        const filteredRecipes = filterRecipes(
          command,
          filters,
          getCommandCount,
          familyMapper,
          isBook
        );

        // Return command with filtered recipes
        return {
          ...command,
          recipes: filteredRecipes,
        };
      })
      .filter((command) => {
        // Search filter - match against translated command name
        const matchesSearch = t(`commands.${command.name}`)
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Undiscovered filter
        if (filters.showOnlyUndiscovered && isCommandDiscovered(command.name)) {
          return false;
        }

        // Remove empty commands only when actually filtering
        if (
          Object.values(filters).some(
            (value) => value !== null && value !== false
          ) &&
          command.recipes.length === 0
        )
          return false;

        return true;
      });
  }, [
    commands,
    searchQuery,
    filters,
    getCommandCount,
    isCommandDiscovered,
    isBook,
    t,
  ]);
};
