import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CommandAccordion from "../components/CommandAccordion.component";
import SearchBox from "../components/SearchBox.component";
import Filters from "../components/Filters.component";
import { commands } from "../model/Commands.model";
import { useCharacter } from "../contexts/Character.context";
import { useCommands } from "../contexts/Commands.context";
import { familyMapper } from "../model/Crystals.model";

const Recipes = () => {
  const { t } = useTranslation();
  const { character } = useCharacter();
  const { isCommandDiscovered } = useCommands();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    ingredient: null,
    ability: null,
    showOnlyUndiscovered: false,
  });

  // Get all commands available for the current character
  const characterCommands = Object.values(commands).filter((command) =>
    command.availableTo.includes(character)
  );

  // Filter commands based on search query and filters
  const filteredCommands = characterCommands.filter((command) => {
    // Search filter
    const matchesSearch = t(`commands.${command.name}`)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Ingredient filter - check if any recipe contains the ingredient
    const matchesIngredient =
      !filters.ingredient ||
      command.recipes?.some(
        (recipe) =>
          recipe.ingredients?.[0] === filters.ingredient ||
          recipe.ingredients?.[1] === filters.ingredient
      );

    // Ability filter - check if any recipe's family can produce the ability
    const matchesAbility =
      !filters.ability ||
      command.recipes?.some((recipe) => {
        const familyCrystals = familyMapper[recipe.family];
        return (
          familyCrystals &&
          Object.values(familyCrystals).includes(filters.ability)
        );
      });

    // Undiscovered filter - check if command is NOT discovered
    const matchesUndiscovered =
      !filters.showOnlyUndiscovered || !isCommandDiscovered(command.name);

    return (
      matchesSearch &&
      matchesIngredient &&
      matchesAbility &&
      matchesUndiscovered
    );
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t("labels.searchCommands")}
          />
        </Box>
        <Filters onFilterChange={setFilters} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {filteredCommands.length > 0 ? (
          filteredCommands.map((command) => (
            <CommandAccordion key={command.name} command={command} />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px", // Optional: give it some height
            }}
          >
            <Typography variant="h3">{t("labels.noCommandsFound")}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Recipes;
