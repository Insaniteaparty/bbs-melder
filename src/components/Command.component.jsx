import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import Recipe from "./Recipe.component";
import { getCommandTypeIcon } from "../utils/icon.utils";

const Command = ({ command }) => {
  const { t } = useTranslation();

  return (
    <Accordion
      sx={{
        minWidth: 300,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          background: "linear-gradient(rgb(83, 37, 14), rgb(225, 126, 76))",
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            component="img"
            src={getCommandTypeIcon(command.type)}
            alt=""
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="h6" fontFamily="KHGummi">
            {t(`commands.${command.name}`)}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} columns={{ sm: 1, md: 2, xl: 3 }}>
          {command.recipes?.map((recipe, index) => (
            <Grid key={index} size={1}>
              <Recipe recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Command;
