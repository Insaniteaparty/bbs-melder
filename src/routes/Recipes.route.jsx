import { Box } from "@mui/material";
import Command from "../components/Command.component";
import { commands } from "../model/Commands.model";
import { useCharacter } from "../contexts/Character.context";

const Recipes = () => {
  const { character } = useCharacter();

  // Get all commands available for the current character
  const characterCommands = Object.values(commands).filter((command) =>
    command.availableTo.includes(character)
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {characterCommands.map((command) => (
        <Command key={command.name} command={command} />
      ))}
    </Box>
  );
};

export default Recipes;
