import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CrystalName, familyMapper } from "../model/Crystals.model";
import { commands, CommandType } from "../model/Commands.model";
import { useState } from "react";
import { getCommandTypeIcon } from "../utils/icon.utils";

const accentColor = "#df961e";

const slotFontSize = "0.75rem";

const numberFontSize = "1.5rem";

const rowMaxHeight = "2rem";

const underline = {
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 8,
    left: 16,
    right: 16,
    height: 2,
    background: `linear-gradient(to right, transparent, ${accentColor} 5%, ${accentColor} 80%, transparent)`,
    borderRadius: 10,
  },
};

const leftPortionSx = {
  px: 2,
  py: 1,
  flex: 1,
  bgcolor: "rgba(0,0,0,0.2)",
  borderRadius: 10,
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
  transform: "translateX(-16px)",
};

const Recipe = ({ recipe }) => {
  const { t } = useTranslation();
  //TODO: change to be mandatory prop
  const ingredient1 = recipe.ingredients[0];
  const ingredient2 = recipe.ingredients[1];
  const family = recipe.family;
  const chance = recipe.chance;

  const [selectedAbility, setSelectedAbility] = useState(null);

  // Generate crystal options based on family
  const crystalOptions =
    family && familyMapper[family]
      ? Object.entries(familyMapper[family]).map(
          ([crystalName, abilityName]) => ({
            label: `${CrystalName[crystalName]} - ${t(
              `abilities.${abilityName}`
            )}`,
            value: abilityName,
          })
        )
      : [];

  return (
    <Card
      sx={{
        minWidth: 300,
        clipPath: "polygon(0 0, 80% 0, 90% 15%, 100% 15%, 100% 100%, 0 100%)",
        bgcolor: "primary.light",
        borderBottomRightRadius: 0,
      }}
    >
      <CardHeader
        title={t("labels.meld") + (chance ? ` - ${chance}%` : "")}
        sx={{
          py: 1,
          position: "relative",
          ...underline,
        }}
        slotProps={{ title: { variant: "subtitle1", fontFamily: "KHGummi" } }}
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
                value={selectedAbility !== null ? selectedAbility : ""}
                displayEmpty
                sx={{
                  ml: "5%",
                  flex: 1,
                  "& .MuiSelect-select": {
                    py: 0.5,
                    fontSize: "0.875rem",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  ---
                </MenuItem>
                {crystalOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
