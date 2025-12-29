import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { commands, CommandType } from "../model/Commands.model";
import { useCommands } from "../contexts/Commands.context";
import { useCharacter } from "../contexts/Character.context";

import { getCommandTypeIcon } from "../utils/icon.utils";

const theRightGradient = (type) => {
  switch (type) {
    case CommandType.Attack:
      return "linear-gradient(rgb(83, 37, 14), rgb(225, 126, 76))";
    case CommandType.Magic:
      return "linear-gradient(rgb(47, 25, 63), rgb(153, 99, 193))";
    case CommandType.Movement:
      return "linear-gradient(rgb(0, 0, 0), rgb(187, 143, 0))";
    case CommandType.Defense:
      return "linear-gradient(rgb(0, 0, 0), rgb(0, 0, 165))";
    case CommandType.Reprisal:
      return "linear-gradient(rgb(0, 0, 0), rgb(155, 0, 0))";
    case CommandType.Shotlock:
      return "linear-gradient(rgb(0, 0, 0), rgb(0, 165, 0))";
    default:
      return "";
  }
};

const iconColor = (activated, type) => ({
  filter: activated ? "" : "grayscale(100%)",
  bgcolor: activated ? "" : "deactivated.main",
  background: activated ? theRightGradient(type) : "",
});

const Discovered = () => {
  const { t } = useTranslation();
  const { character } = useCharacter();
  const { isCommandDiscovered, toggleCommandDiscovered } = useCommands();

  // TODO: translate command type labels
  const getCommandTypeLabel = (type) => {
    switch (type) {
      case CommandType.Attack:
        return "Attack Commands";
      case CommandType.Magic:
        return "Magic Commands";
      case CommandType.Movement:
        return "Movement Commands";
      case CommandType.Defense:
        return "Defense Commands";
      case CommandType.Reprisal:
        return "Reprisal Commands";
      case CommandType.Shotlock:
        return "Shotlock Commands";
      default:
        return "";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {Object.values(CommandType)
        .filter((type) => typeof type === "number")
        .map((type) => (
          <Box key={type}>
            <Typography variant="h6" gutterBottom>
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
