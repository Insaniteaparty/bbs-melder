import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import RecipeButton from "./RecipeButton.component";
import { getCommandTypeIcon } from "../theme/icon.theme";
import { getGradientByCommandType } from "../theme/gradient.theme";
import { clip } from "../theme/shapes.theme";
import NotDiscovered from "./NotDiscovered.component";

const clipPathStyle = clip.card;

const CommandCard = ({
  command,
  canMakeRecipe,
  isRecipeMakeable,
  isDiscovered,
}) => {
  const { t } = useTranslation();

  // Filter recipes to only show those that can be made
  const makeableRecipes =
    command.recipes?.filter((recipe) => {
      return canMakeRecipe(recipe);
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
            {!isDiscovered && <NotDiscovered />}
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={2} columns={{ sm: 1 }}>
          {makeableRecipes.map((recipe, index) => (
            <Grid key={index} size={1}>
              <RecipeButton
                recipe={recipe}
                command={command}
                disabled={isRecipeMakeable ? !isRecipeMakeable(recipe) : false}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default React.memo(CommandCard);
