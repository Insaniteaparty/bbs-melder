import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useCommands } from "../contexts/Commands.context";
import { useCharacter } from "../contexts/Character.context";
import { commands, CommandType } from "../model/Commands.model";

import { getCommandTypeIcon } from "../theme/icon.theme";
import { getGradientByCommandType } from "../theme/gradient.theme";
import { useMemo } from "react";

const iconColor = (activated, type) => ({
  filter: activated ? "" : "grayscale(100%)",
  bgcolor: activated ? "" : "deactivated.main",
  background: activated ? getGradientByCommandType(type) : "",
});

const Discovered = () => {
  const { t } = useTranslation();
  const { character } = useCharacter();
  const { isCommandDiscovered, toggleCommandDiscovered } = useCommands();

  const getCommandTypeLabel = useMemo(
    () => (type) => {
      switch (type) {
        case CommandType.Attack:
          return t("titles.attackCommands");
        case CommandType.Magic:
          return t("titles.magicCommands");
        case CommandType.Movement:
          return t("titles.movementCommands");
        case CommandType.Defense:
          return t("titles.defenseCommands");
        case CommandType.Reprisal:
          return t("titles.reprisalCommands");
        case CommandType.Shotlock:
          return t("titles.shotlockCommands");
        default:
          return "";
      }
    },
    [t]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 3 }}>
      {Object.values(CommandType)
        .filter((type) => typeof type === "number")
        .map((type) => (
          <Box key={type}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: (theme) => theme.typography.onBackground.color,
                textShadow: (theme) => theme.typography.onBackground.textShadow,
              }}
            >
              {getCommandTypeLabel(type)}
            </Typography>
            <Grid container spacing={1}>
              {Object.values(commands)
                .filter(
                  (command) =>
                    command.type === type &&
                    command.availableTo.includes(character)
                )
                .map((command) => (
                  <Grid key={command.name}>
                    <Tooltip
                      title={t(`commands.${command.name}`)}
                      arrow
                      slotProps={{
                        tooltip: {
                          sx: {
                            bgcolor: "primary.main",
                            "& .MuiTooltip-arrow": {
                              color: "primary.main",
                            },
                          },
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={getCommandTypeIcon(type)}
                        alt={t(`commands.${command.name}`)}
                        sx={{
                          width: 40,
                          height: 40,
                          cursor: "pointer",
                          ...iconColor(isCommandDiscovered(command.name), type),
                        }}
                        onClick={() => toggleCommandDiscovered(command.name)}
                      />
                    </Tooltip>
                  </Grid>
                ))}
            </Grid>
          </Box>
        ))}
    </Box>
  );
};

export default Discovered;
