import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import RecipeButton from "./RecipeButton.component";
import { getCommandTypeIcon } from "../theme/icon.theme";
import { getGradientByCommandType } from "../theme/gradient.theme";
import { useCommands } from "../contexts/Commands.context";

const clipPathStyle =
  "polygon(0 30px, 30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)";

const CommandCard = ({ command, canMakeRecipe }) => {
  const { t } = useTranslation();
  const { isCommandDiscovered, getCommandCount } = useCommands();

  // Filter recipes to only show those that can be made
  const makeableRecipes =
    command.recipes?.filter((recipe) => {
      if (canMakeRecipe) {
        return canMakeRecipe(recipe);
      }
      // Fallback logic if canMakeRecipe is not provided
      return recipe.ingredients.every(
        (ingredient) => getCommandCount(ingredient) > 0
      );
    }) || [];

  if (makeableRecipes.length === 0) {
    return null; // Don't render card if no makeable recipes
  }

  return (
    <Card
      sx={{
        minWidth: 300,
        clipPath: clipPathStyle,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <CardHeader
        sx={{
          background: getGradientByCommandType(command.type),
          clipPath: clipPathStyle,
        }}
        avatar={
          <Box
            component="img"
            src={getCommandTypeIcon(command.type)}
            alt=""
            sx={{ width: 32, height: 32 }}
          />
        }
        title={
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6" fontFamily="KHGummi" flex={1}>
              {t(`commands.${command.name}`)}
            </Typography>
            {!isCommandDiscovered(command.name) && (
              <Typography
                variant="h6"
                fontFamily="KHGummi"
                sx={{
                  color: "rgba(255, 255, 0, 0.5)",
                  WebkitTextStroke: "1px rgba(255, 165, 0, 0.5)",
                  textShadow:
                    "1px 1px 0 rgba(255, 165, 0, 0.5), -1px -1px 0 rgba(255, 165, 0, 0.5), 1px -1px 0 rgba(255, 165, 0, 0.5), -1px 1px 0 rgba(255, 165, 0, 0.5)",
                }}
              >
                NEW
              </Typography>
            )}
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={2} columns={{ sm: 1 }}>
          {makeableRecipes.map((recipe, index) => (
            <Grid key={index} size={1}>
              <RecipeButton recipe={recipe} command={command} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CommandCard;
