import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Avatar,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { commands } from "../model/Commands.model";
import { useCharacter } from "../contexts/Character.context";
import { getCommandTypeIcon } from "../theme/icon.theme";
import SearchBox from "../components/SearchBox.component";
import { useCommands } from "../contexts/Commands.context";

const clipPathStyle =
  "polygon(0 10px, 10px 0, 100% 0, 100% 0, 100% 100%, 0 100%)";

const Planner = () => {
  const { t } = useTranslation();
  const { character } = useCharacter();
  const { addCommand, removeCommand, getCommandCount } = useCommands();

  const [searchQuery, setSearchQuery] = useState("");

  // Memoize commands available for the current character
  const characterCommands = useMemo(
    () =>
      Object.values(commands).filter((command) =>
        command.availableTo.includes(character)
      ),
    [character]
  );

  // Filter commands based on search query
  const filteredCommands = useMemo(
    () =>
      characterCommands.filter((command) =>
        t(`commands.${command.name}`)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [characterCommands, searchQuery, t]
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
                  sx={{ minWidth: 20, textAlign: "center" }}
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

      {/* Right Column - Grid Area (Placeholder) */}
      <Paper
        sx={{
          flex: 1,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Grid area - coming soon
        </Typography>
      </Paper>
    </Box>
  );
};

export default Planner;
