import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { commands } from "../model/Commands.model";
import { getCommandTypeIcon } from "../theme/icon.theme";
import MeldModal from "./MeldModal.component";
import { underline } from "../theme/shapes.theme";
import { useWishlist } from "../contexts/Wishlist.context";

const accentColor = "#df961e";

const rowMaxHeight = "2rem";

const rightPortionSx = {
  maxHeight: rowMaxHeight,
  px: 2,
  flex: 9,
  bgcolor: "rgba(0,0,0,0.3)",
  borderRadius: 10,
  borderTop: "2px solid rgba(0,0,0,0.2)",
  borderBottom: "2px solid rgba(255,255,255,0.2)",
};

const RecipeButton = ({ recipe, command, disabled = false }) => {
  const { t } = useTranslation();
  const { isRecipeInWishlist, removeFromWishlist } = useWishlist();
  const [modalOpen, setModalOpen] = useState(false);

  const ingredient1 = recipe.ingredients[0];
  const ingredient2 = recipe.ingredients[1];
  const chance = recipe.chance;

  const isWishlisted = isRecipeInWishlist(command.name, recipe.id);

  const handleCardClick = () => {
    if (!disabled) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        p: 0.3,
        ...(!disabled && {
          "&:hover": {
            transform: "scale(1.02)",
            transition: "transform 0.2s",
            borderRadius: 1,
            background: "rgba(255,0,0,0.3)",
          },
        }),
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Star/X Overlay - Combined indicator */}
        {isWishlisted && (
          <Box
            sx={{
              position: "absolute",
              top: "0%",
              right: "0",
              transform: "translate(5%, -50%)",
              zIndex: 10,
              borderRadius: 2,
              px: 1,
              py: 0.5,
            }}
          >
            <Tooltip
              placement="left"
              title={disabled ? t("actions.removeFromWishlist") : ""}
            >
              <Typography
                onClick={(e) => {
                  if (disabled) {
                    e.stopPropagation();
                    removeFromWishlist(command.name, recipe.id);
                  }
                }}
                variant="h6"
                sx={
                  disabled
                    ? {
                        color: "rgba(255, 0, 0, 0.8)",
                        textShadow: "none",
                        cursor: "pointer",
                      }
                    : {
                        color: "rgba(255, 255, 0, 0.5)",
                        WebkitTextStroke: "1px rgba(255, 165, 0, 0.5)",
                        textShadow:
                          "1px 1px 0 rgba(255, 165, 0, 0.5), -1px -1px 0 rgba(255, 165, 0, 0.5), 1px -1px 0 rgba(255, 165, 0, 0.5), -1px 1px 0 rgba(255, 165, 0, 0.5)",
                      }
                }
              >
                {disabled ? "x" : "★"}
              </Typography>
            </Tooltip>
          </Box>
        )}

        <Card
          onClick={handleCardClick}
          sx={{
            minWidth: 100,
            clipPath:
              "polygon(0 0, 85% 0, 90% 10%, 100% 10%, 100% 100%, 0 100%)",
            bgcolor: "primary.light",
            borderBottomRightRadius: 0,
            borderTop: "2px solid rgba(255,255,255,0.3)",
            borderBottom: "2px solid rgba(0,0,0,0.2)",
            cursor: disabled ? "default" : "pointer",
          }}
        >
          <CardHeader
            sx={{
              py: 1,
              position: "relative",
              "&::after": { ...underline(accentColor) },
            }}
            slotProps={{
              title: { variant: "subtitle1", fontFamily: "KHGummi" },
            }}
          />
          <CardContent
            sx={{ pt: 0, pb: "0.5rem!important", position: "relative" }}
          >
            {/* Percentage Overlay - Right side */}
            {chance && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  transform: "translate(-5%, -60%)",
                  zIndex: 10,
                  borderRadius: 2,
                  px: 1,
                  py: 0.5,
                }}
              >
                <Typography
                  fontFamily="KHGummi"
                  fontSize="1rem"
                  fontWeight="bold"
                  color={"rgba(255, 220, 0, 1)"}
                  sx={{ textShadow: "3px 3px 6px rgba(0,0,0,0.7)" }}
                >
                  {chance}%
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {/* Row 1 - Ingredient 1 */}
              <Box
                sx={{
                  display: "flex",
                  maxHeight: rowMaxHeight,
                }}
              >
                <Box
                  sx={{
                    ...rightPortionSx,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={getCommandTypeIcon(commands[ingredient1]?.type)}
                    alt=""
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography variant="body2">
                    {t(`commands.${ingredient1}`) || "None"}
                  </Typography>
                </Box>
              </Box>

              {/* Row 2 - Ingredient 2 */}

              <Box
                sx={{
                  ...rightPortionSx,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  component="img"
                  src={getCommandTypeIcon(commands[ingredient2]?.type)}
                  alt=""
                  sx={{ width: 24, height: 24 }}
                />
                <Typography variant="body2">
                  {t(`commands.${ingredient2}`) || "None"}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Modal */}
      <MeldModal
        open={modalOpen}
        onClose={handleCloseModal}
        recipe={recipe}
        command={command}
      />
    </Box>
  );
};

export default React.memo(RecipeButton);
