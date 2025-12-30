import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import Recipe from "./Recipe.component";
import { getCommandTypeIcon } from "../theme/icon.theme";

const clipPathStyle =
  "polygon(0 30px, 30px 0, 100% 0, 100% 0, 100% 100%, 0 100%)";

const CommandAccordion = ({ command }) => {
  const { t } = useTranslation();
  const hasRecipes = command.recipes && command.recipes.length > 0;
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      expanded={expanded}
      onChange={(e, isExpanded) => setExpanded(isExpanded)}
      sx={{
        minWidth: 300,
        clipPath: clipPathStyle,
        borderRadius: expanded ? "0 2.3rem 0 0" : "0 8rem 8rem 0",
        backgroundImage: "none",
        "&.Mui-disabled": {
          backgroundColor: "transparent",
          opacity: 1,
        },
        "& .MuiAccordionSummary-root.Mui-disabled": {
          opacity: 1,
        },
      }}
      disabled={!hasRecipes}
    >
      <AccordionSummary
        expandIcon={hasRecipes ? <ExpandMoreIcon /> : null}
        sx={{
          background: (theme) => theme.palette.primary.main,
          borderRadius: "0 8rem 8rem 0",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          clipPath: clipPathStyle,
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
      {hasRecipes && (
        <AccordionDetails>
          <Grid container spacing={2} columns={{ sm: 1, md: 2, xl: 3 }}>
            {command.recipes.map((recipe, index) => (
              <Grid key={index} size={1}>
                <Recipe recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default CommandAccordion;
