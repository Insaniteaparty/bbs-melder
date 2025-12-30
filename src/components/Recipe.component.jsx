import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CrystalName, familyMapper } from "../model/Crystals.model";
import { commands } from "../model/Commands.model";
import { abilities } from "../model/Abilities.model";
import { useAbilities } from "../contexts/Abilities.context";

import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { getCommandTypeIcon } from "../theme/icon.theme";
import { underline } from "../theme/shapes.theme";

const accentColor = "#df961e";

const slotFontSize = "0.75rem";

const numberFontSize = "1.5rem";

const rowMaxHeight = "2rem";

const leftPortionSx = {
  px: 2,
  py: 1,
  flex: 1,
  bgcolor: "rgba(0,0,0,0.2)",
  borderRadius: 10,
  borderTop: "2px solid rgba(255,255,255,0.3)",
  borderBottom: "2px solid rgba(0,0,0,0.2)",
  clipPath:
    "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)",
};

const rightPortionSx = {
  px: 2,
  py: 1,
  flex: 2,
  bgcolor: "rgba(0,0,0,0.3)",
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 20px 50%)",
  borderRadius: "0 100px 100px 0",
  borderTop: "2px solid rgba(0,0,0,0.2)",
  borderBottom: "2px solid rgba(255,255,255,0.2)",
  transform: "translateX(-16px)",
};

const Recipe = ({ recipe, isPopup = false, value, onChange }) => {
  const { t } = useTranslation();
  const ingredient1 = recipe.ingredients[0];
  const ingredient2 = recipe.ingredients[1];
  const family = recipe.family;
  const chance = recipe.chance;

  // Use internal state only if parent doesn't provide value and onChange
  const [internalSelectedAbility, setInternalSelectedAbility] = useState(null);
  const { getAbilityCount } = useAbilities();

  // Determine if this is a controlled component
  const isControlled = value !== undefined && onChange !== undefined;

  // Use parent state if controlled, otherwise use internal state
  const selectedAbility = isControlled ? value : internalSelectedAbility;
  const setSelectedAbility = isControlled
    ? onChange
    : setInternalSelectedAbility;

  // Generate crystal options - single source of truth
  const crystalOptions =
    family !== null && familyMapper[family]
      ? Object.entries(familyMapper[family]).map(
          ([crystalName, abilityName]) => ({
            crystalName,
            crystalLabel: CrystalName[crystalName],
            abilityName,
            abilityLabel: t(`abilities.${abilityName}`),
          })
        )
      : [];

  // Helper to find option by ability name
  const findOption = (abilityName) =>
    crystalOptions.find((opt) => opt.abilityName === abilityName);

  return (
    <Card
      sx={{
        minWidth: 300,
        clipPath: "polygon(0 0, 80% 0, 90% 15%, 100% 15%, 100% 100%, 0 100%)",
        bgcolor: "primary.light",
        borderBottomRightRadius: 0,
        borderTop: "2px solid rgba(255,255,255,0.3)",
        borderBottom: "2px solid rgba(0,0,0,0.2)",
      }}
    >
      <CardHeader
        title={t("labels.meld") + (chance ? ` - ${chance}%` : "")}
        sx={{
          py: 0,
          position: "relative",
          "&::after": { ...underline(accentColor) },
        }}
        slotProps={{
          title: {
            variant: "subtitle1",
            fontFamily: "KHGummi",
            fontSize: "1.5rem",
          },
        }}
      />
      <CardContent sx={{ pt: 0, pb: "0.5rem!important" }}>
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
                ...leftPortionSx,
                overflow: "hidden",
              }}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              <Typography
                fontFamily={"KHGummi"}
                fontSize={slotFontSize}
                textTransform={"uppercase"}
                mr={0.75}
              >
                Slot
              </Typography>
              <Typography
                fontFamily={"KHGummi"}
                fontSize={numberFontSize}
                color={`${accentColor}`}
                sx={{ lineHeight: 1 }}
              >
                1
              </Typography>
            </Box>
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
                sx={{ width: 24, height: 24, ml: 1 }}
              />
              <Typography variant="body2">
                {t(`commands.${ingredient1}`) || "None"}
              </Typography>
            </Box>
          </Box>

          {/* Row 2 - Ingredient 2 */}
          <Box
            sx={{
              display: "flex",
              maxHeight: rowMaxHeight,
            }}
          >
            <Box
              sx={{
                ...leftPortionSx,
                overflow: "hidden",
              }}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              <Typography
                fontFamily={"KHGummi"}
                fontSize={slotFontSize}
                textTransform={"uppercase"}
              >
                Slot
              </Typography>
              <Typography
                fontFamily={"KHGummi"}
                fontSize={numberFontSize}
                color={`${accentColor}`}
                sx={{ lineHeight: 1 }}
              >
                2
              </Typography>
            </Box>
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
                sx={{ width: 24, height: 24, ml: 1 }}
              />
              <Typography variant="body2">
                {t(`commands.${ingredient2}`) || "None"}
              </Typography>
            </Box>
          </Box>

          {/* Row 3 - Crystal */}
          <Box
            sx={{
              display: "flex",
              maxHeight: rowMaxHeight,
            }}
          >
            <Box
              sx={{
                ...leftPortionSx,
                overflow: "hidden",

                bgcolor: "#26be01",
              }}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              <Typography
                fontFamily={"KHGummi"}
                fontSize={slotFontSize}
                textTransform={"uppercase"}
              >
                Item
              </Typography>
              <Typography
                fontFamily={"KHGummi"}
                fontSize={numberFontSize}
                visibility={"hidden"}
              >
                3
              </Typography>
            </Box>
            <Box
              sx={{
                ...rightPortionSx,
                bgcolor: "#018e5e",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Select
                onChange={(event) => {
                  setSelectedAbility(event.target.value);
                }}
                value={selectedAbility}
                displayEmpty
                renderValue={(selected) => {
                  if (selected === null) return "---";

                  const option = findOption(selected);
                  if (typeof option === "number") return "---";
                  // Show only crystal name when isPopup is true and item is selected
                  return isPopup
                    ? option.crystalLabel
                    : `${option.crystalLabel} - ${option.abilityLabel}`;
                }}
                sx={{
                  ml: "5%",
                  flex: 1,
                  "& .MuiSelect-select": {
                    py: 0.5,
                    fontSize: "0.875rem",
                  },
                }}
                slotProps={{
                  input: {
                    sx: {
                      color: (theme) => theme.typography.allVariants.color,
                      textShadow: (theme) =>
                        theme.typography.allVariants.textShadow,
                    },
                  },
                }}
              >
                {crystalOptions.map((option) => (
                  <MenuItem
                    key={option.abilityName}
                    value={option.abilityName}
                    disabled={
                      getAbilityCount(option.abilityName) >=
                      abilities[option.abilityName].limit
                    }
                  >
                    {/* Always show full label in dropdown */}
                    {option.crystalLabel} - {option.abilityLabel}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Recipe;
