import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { commands } from "../model/Commands.model";
import { useCommands } from "../contexts/Commands.context";
import { useWishlist } from "../contexts/Wishlist.context";

import { canMakeRecipe } from "../utils/recipe.utils";
import { familyMapper } from "../model/Crystals.model";

import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  Paper,
  Grid,
} from "@mui/material";

import SearchBox from "../components/SearchBox.component";
import CommandCard from "../components/CommandCard.component";
import Filters from "../components/Filters.component";

import { getCommandTypeIcon } from "../theme/icon.theme";
import { clip } from "../theme/shapes.theme";
import { getSolidColorByCommandType } from "../theme/gradient.theme";

const clipPathStyle = clip.standard;

const Wishlist = () => {
  const { t } = useTranslation();
  const { isCommandDiscovered, getCommandCount } = useCommands();
  const { ingredientCounts, wishlistCommands } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [recipeSearchQuery, setRecipeSearchQuery] = useState("");
  const [recipeFilters, setRecipeFilters] = useState({
    ingredient: null,
    ability: null,
    showOnlyUndiscovered: false,
  });

  // Memoize translated names for left panel (inventory)
  const localizedIngredientCounts = useMemo(
    () =>
      Object.entries(ingredientCounts)
        .map(([commandName, count]) => ({
          commandName,
          name: t(`commands.${commandName}`).toLowerCase(),
          type: commands[commandName]?.type,
          count: count,
        }))
        .filter((item) => item.name.includes(searchQuery.toLowerCase())),
    [ingredientCounts, t, searchQuery]
  );

  // Filter wishlist commands based on recipe search and filters
  const filteredWishlistCommands = useMemo(() => {
    const filtered = {};

    Object.entries(wishlistCommands).forEach(([commandName, recipes]) => {
      const commandTranslated = t(`commands.${commandName}`).toLowerCase();

      // Check if command name matches recipe search
      const matchesSearch =
        !recipeSearchQuery ||
        commandTranslated.includes(recipeSearchQuery.toLowerCase());

      if (!matchesSearch) return;

      // Filter recipes based on filters
      const filteredRecipes = recipes.filter((recipe) => {
        // Ingredient filter
        if (
          recipeFilters.ingredient !== null &&
          !recipe.ingredients.includes(recipeFilters.ingredient)
        ) {
          return false;
        }

        // Ability filter
        if (recipeFilters.ability !== null) {
          const hasAbility = Object.values(
            familyMapper[recipe.family] || {}
          ).includes(recipeFilters.ability);
          if (!hasAbility) return false;
        }

        // Show only undiscovered filter
        if (
          recipeFilters.showOnlyUndiscovered &&
          isCommandDiscovered(commandName)
        ) {
          return false;
        }

        return true;
      });

      if (filteredRecipes.length > 0) {
        filtered[commandName] = filteredRecipes;
      }
    });

    return filtered;
  }, [
    wishlistCommands,
    recipeSearchQuery,
    recipeFilters,
    isCommandDiscovered,
    t,
  ]);

  return (
    <Box sx={{ display: "flex", gap: 2, height: "calc(100vh - 4rem)" }}>
      {/* Left Column - Command List */}
      <Paper
        sx={{
          width: 300,
          overflow: "auto",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          textAlign={"center"}
          fontFamily={"KHGummi"}
          sx={{
            color: (theme) => theme.typography.onBackground.color,
            textShadow: (theme) => theme.typography.onBackground.textShadow,
          }}
        >
          {t("labels.wishlist")}
        </Typography>
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t("labels.searchCommands")}
          compact
        />
        <List sx={{ p: 0 }}>
          {localizedIngredientCounts.map(({ name, type, count }) => (
            <ListItem
              key={name}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                py: 0.5,
                px: 1,
              }}
            >
              <Box
                flex={1}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                sx={{
                  bgcolor: (theme) => getSolidColorByCommandType(type, theme),
                  borderRadius: "0 2rem 2rem 0",
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  borderBottom: "1px solid rgba(0,0,0,0.2)",
                  clipPath: clipPathStyle,
                  pl: 1,
                }}
              >
                <Avatar
                  src={getCommandTypeIcon(type)}
                  alt=""
                  sx={{ width: 24, height: 24 }}
                />
                <Typography variant="body2" fontSize={"0.8rem"}>
                  {name}
                </Typography>
                <Box flex={1} />
                <Typography
                  variant="body2"
                  fontSize={"0.8rem"}
                  color="rgba(255, 220, 0, 1)"
                  pr={2}
                >
                  x{count}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Right Column - Grid Area */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflow: "auto",
        }}
      >
        {/* Search and Filter Controls */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "flex-start" }}>
          <Box sx={{ flex: 1 }}>
            <SearchBox
              value={recipeSearchQuery}
              onChange={setRecipeSearchQuery}
              placeholder={t("labels.searchRecipes")}
              compact
            />
          </Box>
          <Filters onFilterChange={setRecipeFilters} />
        </Box>

        <Grid container spacing={2}>
          {Object.entries(filteredWishlistCommands).map(
            ([commandName, recipes]) => (
              <Grid key={commandName} size={{ xs: 12, md: 6, lg: 4 }}>
                <CommandCard
                  command={commands[commandName]}
                  canMakeRecipe={(recipe) => {
                    // Show recipe if it's in the wishlist (always return true)
                    return recipes.some((r) => r.id === recipe.id);
                  }}
                  isRecipeMakeable={(recipe) => {
                    // Check if we actually have the ingredients
                    return canMakeRecipe(recipe, getCommandCount);
                  }}
                  isDiscovered={isCommandDiscovered(commandName)}
                />
              </Grid>
            )
          )}
        </Grid>
        {Object.keys(filteredWishlistCommands).length === 0 &&
          Object.keys(wishlistCommands).length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50%",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: (theme) => theme.typography.onBackground.color,
                  textShadow: (theme) =>
                    theme.typography.onBackground.textShadow,
                }}
              >
                {t("messages.noMatchingRecipes")}
              </Typography>
            </Box>
          )}
        {Object.keys(wishlistCommands).length === 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.typography.onBackground.color,
                textShadow: (theme) => theme.typography.onBackground.textShadow,
              }}
            >
              {t("messages.noWishlistItems")}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Wishlist;
