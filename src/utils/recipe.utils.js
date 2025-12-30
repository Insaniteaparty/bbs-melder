// src/utils/recipe.utils.js
/**
 * Utility functions for recipe and command operations
 */

/**
 * Checks if a recipe can be made based on available command counts.
 * Handles the special case where both ingredients are the same (needs 2+ of that command).
 *
 * @param {Object} recipe - Recipe object with ingredients array
 * @param {Function} getCommandCount - Function to get count of a command by name
 * @returns {boolean} True if recipe can be made
 */
export const canMakeRecipe = (recipe, getCommandCount) => {
  if (recipe.ingredients[0] === recipe.ingredients[1]) {
    // Special case: if both ingredients are the same, need at least 2 of that command
    return getCommandCount(recipe.ingredients[0]) >= 2;
  }
  return recipe.ingredients.every(
    (ingredient) => getCommandCount(ingredient) > 0
  );
};

/**
 * Filters recipes within a command based on various criteria.
 *
 * @param {Object} command - Command object with recipes array
 * @param {Object} filters - Filter configuration
 * @param {string|null} filters.ingredient - Filter by specific ingredient
 * @param {string|null} filters.ability - Filter by ability the recipe can produce
 * @param {boolean} filters.showOnlyUndiscovered - Show only undiscovered commands
 * @param {Function} getCommandCount - Function to get command counts
 * @param {Function} isCommandDiscovered - Function to check if command is discovered
 * @param {Object} familyMapper - Mapping of families to abilities
 * @returns {Array} Filtered array of recipes
 */
export const filterRecipes = (
  command,
  filters,
  getCommandCount,
  familyMapper,
  isBook = false
) => {
  if (!command.recipes) return [];

  return command.recipes.filter((recipe) => {
    // First check if recipe can be made
    if (!isBook && !canMakeRecipe(recipe, getCommandCount)) return false;

    // Ingredient filter
    if (filters.ingredient !== null) {
      const hasIngredient = recipe.ingredients.includes(filters.ingredient);
      if (!hasIngredient) return false;
    }

    // Ability filter (check recipe family/ability)
    if (filters.ability !== null) {
      const hasAbility = Object.values(
        familyMapper[recipe.family] || {}
      ).includes(filters.ability);
      if (!hasAbility) return false;
    }

    return true;
  });
};
