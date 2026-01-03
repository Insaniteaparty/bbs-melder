import { Box, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import CommandAccordion from "../components/AltCommandAccordion.component";
import SearchBox from "../components/SearchBox.component";
import Filters from "../components/Filters.component";
import { commands } from "../model/Commands.model";
import { useCharacter } from "../contexts/Character.context";
import { useCommands } from "../contexts/Commands.context";
import { useCommandFilters } from "../hooks/useCommandFilters";

const Recipes = () => {
  const { t } = useTranslation();
  const { character } = useCharacter();
  const { getCommandCount, isCommandDiscovered } = useCommands();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    ingredient: null,
    ability: null,
    showOnlyUndiscovered: false,
  });

  // Get all commands available for the current character
  const characterCommands = useMemo(
    () =>
      Object.values(commands).filter((command) =>
        command.availableTo.includes(character)
      ),
    [character]
  );

  // Filter commands using shared hook
  const filteredCommands = useCommandFilters(
    characterCommands,
    searchQuery,
    filters,
    getCommandCount,
    isCommandDiscovered,
    true
  );

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
            <CommandAccordion
              key={command.name}
              command={command}
              isDiscovered={isCommandDiscovered(command.name)}
            />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.typography.onBackground.color,
                textShadow: (theme) => theme.typography.onBackground.textShadow,
              }}
            >
              {t("messages.noCommandsFound")}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Recipes;
