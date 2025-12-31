import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { commands } from "../model/Commands.model";
import { useCharacter } from "../contexts/Character.context";
import { useCommands } from "../contexts/Commands.context";
import { useCommandFilters } from "../hooks/useCommandFilters";
import { canMakeRecipe } from "../utils/recipe.utils";

import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Avatar,
  Paper,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import munnyIcon from "../assets/munny.webp";

import SearchBox from "../components/SearchBox.component";
import CommandCard from "../components/CommandCard.component";
import Filters from "../components/Filters.component";

import { getCommandTypeIcon } from "../theme/icon.theme";
import { clip } from "../theme/shapes.theme";
import { useWishlist } from "../contexts/Wishlist.context";

const clipPathStyle = clip.standard;
const countMinWidth = 15;

const Planner = () => {
  const { t } = useTranslation();
  const { character } = useCharacter();
  const { addCommand, removeCommand, getCommandCount, isCommandDiscovered } =
    useCommands();
  const { ingredientCounts } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [recipeSearchQuery, setRecipeSearchQuery] = useState("");
  const [recipeFilters, setRecipeFilters] = useState({
    ingredient: null,
    ability: null,
    showOnlyUndiscovered: false,
  });

  // Memoize commands available for the current character
  const characterCommands = useMemo(
    () =>
      Object.values(commands).filter((command) =>
        command.availableTo.includes(character)
      ),
    [character]
  );

  // Memoize translated names for left panel (inventory)
  const translatedCommands = useMemo(
    () =>
      characterCommands.map((cmd) => ({
        ...cmd,
        translatedName: t(`commands.${cmd.name}`).toLowerCase(),
      })),
    [characterCommands, t]
  );

  // Filter commands based on search query (left panel)
  const filteredCommands = useMemo(
    () =>
      translatedCommands.filter((cmd) =>
        cmd.translatedName.includes(searchQuery.toLowerCase())
      ),
    [translatedCommands, searchQuery]
  );

  // Filter commands that have at least one makeable recipe
  const makeableCommands = useMemo(
    () =>
      characterCommands.filter((command) => {
        if (!command.recipes || command.recipes.length === 0) return false;
        return command.recipes.some((recipe) =>
          canMakeRecipe(recipe, getCommandCount)
        );
      }),
    [characterCommands, getCommandCount]
  );

  // Filter and process makeable commands with recipes for right panel
  const filteredMakeableCommands = useCommandFilters(
    makeableCommands,
    recipeSearchQuery,
    recipeFilters,
    getCommandCount,
    isCommandDiscovered
  );

  const handleIncrement = (commandName) => {
    addCommand(commandName);
  };

  const handleDecrement = (commandName) => {
    removeCommand(commandName);
  };

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
          {t("labels.inventory")}
        </Typography>
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t("labels.searchCommands")}
          compact
        />
        <List sx={{ p: 0 }}>
          {filteredCommands.map((command) => (
            <ListItem
              key={command.name}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                py: 0.5,
                px: 1,
              }}
            >
              <Box position={"relative"} display={"flex"} flex={1}>
                <Box
                  flex={1}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  sx={{
                    bgcolor: (theme) => theme.palette.primary.main,
                    borderRadius: "0 2rem 2rem 0",
                    borderTop: "1px solid rgba(255,255,255,0.2)",
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                    clipPath: clipPathStyle,
                    pl: 1,
                  }}
                >
                  <Avatar
                    src={getCommandTypeIcon(command.type)}
                    alt=""
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography variant="body2" fontSize={"0.8rem"}>
                    {t(`commands.${command.name}`)}
                  </Typography>
                </Box>
                {/* munny icon if in not enough to complete a wishlisted recipe */}
                {ingredientCounts &&
                  Object.keys(ingredientCounts).includes(
                    String(command.name)
                  ) && (
                    <Box
                      position={"absolute"}
                      left={"-20px"}
                      height={"100%"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Avatar
                        src={munnyIcon}
                        alt=""
                        sx={{ width: 20, height: 20 }}
                      />
                    </Box>
                  )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  size="small"
                  onClick={() => handleDecrement(command.name)}
                  disabled={getCommandCount(command.name) === 0}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{
                    minWidth: countMinWidth,
                    textAlign: "center",
                    color: (theme) => theme.typography.onBackground.color,
                    textShadow: (theme) =>
                      theme.typography.onBackground.textShadow,
                  }}
                >
                  {getCommandCount(command.name)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleIncrement(command.name)}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
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
          {filteredMakeableCommands.map((command) => (
            <Grid key={command.name} size={{ xs: 12, md: 6, lg: 4 }}>
              <CommandCard
                command={command}
                canMakeRecipe={(recipe) =>
                  canMakeRecipe(recipe, getCommandCount)
                }
              />
            </Grid>
          ))}
        </Grid>
        {filteredMakeableCommands.length === 0 &&
          makeableCommands.length > 0 && (
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
        {makeableCommands.length === 0 && (
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
              {t("messages.noMakeableRecipes")}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Planner;
