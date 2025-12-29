import {
  Box,
  Button,
  Popover,
  Autocomplete,
  TextField,
  Typography,
  Divider,
  Badge,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CommandName } from "../model/Commands.model";
import { AbilityName } from "../model/Abilities.model";

const Filters = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [ingredientFilter, setIngredientFilter] = useState(null);
  const [abilityFilter, setAbilityFilter] = useState(null);

  const open = Boolean(anchorEl);

  // Count active filters
  const activeFiltersCount = [ingredientFilter, abilityFilter].filter(
    (filter) => filter !== null
  ).length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIngredientChange = (event, newValue) => {
    setIngredientFilter(newValue);
    onFilterChange({ ingredient: newValue, ability: abilityFilter });
  };

  const handleAbilityChange = (event, newValue) => {
    setAbilityFilter(newValue);
    onFilterChange({ ingredient: ingredientFilter, ability: newValue });
  };

  const handleClearFilters = () => {
    setIngredientFilter(null);
    setAbilityFilter(null);
    onFilterChange({ ingredient: null, ability: null });
  };

  // Get all command names for autocomplete
  const commandOptions = Object.values(CommandName).filter(
    (value) => typeof value === "number"
  );

  // Get all ability names for autocomplete
  const abilityOptions = Object.values(AbilityName).filter(
    (value) => typeof value === "number"
  );

  return (
    <>
      <Badge badgeContent={activeFiltersCount} color="primary">
        <Button
          variant={activeFiltersCount > 0 ? "contained" : "outlined"}
          startIcon={<FilterListIcon />}
          onClick={handleClick}
          sx={{ mb: 2 }}
        >
          {t("labels.filters")}
        </Button>
      </Badge>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              p: 2,
            },
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            fontWeight: "bold",
            fontFamily: "KHGummi",
            color: (theme) => theme.typography.onBackground.color,
            textShadow: (theme) => theme.typography.onBackground.textShadow,
          }}
        >
          {t("labels.filterByIngredient")}
        </Typography>
        <Autocomplete
          value={ingredientFilter}
          onChange={handleIngredientChange}
          options={commandOptions}
          getOptionLabel={(option) => t(`commands.${option}`)}
          renderInput={(params) => (
            <TextField {...params} placeholder={t("labels.selectIngredient")} />
          )}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            fontWeight: "bold",
            fontFamily: "KHGummi",
            color: (theme) => theme.typography.onBackground.color,
            textShadow: (theme) => theme.typography.onBackground.textShadow,
          }}
        >
          {t("labels.filterByAbility")}
        </Typography>
        <Autocomplete
          value={abilityFilter}
          onChange={handleAbilityChange}
          options={abilityOptions}
          getOptionLabel={(option) => t(`abilities.${option}`)}
          renderInput={(params) => (
            <TextField {...params} placeholder={t("labels.selectAbility")} />
          )}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 2 }} />

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleClearFilters}
        >
          {t("labels.clearFilters")}
        </Button>
      </Popover>
    </>
  );
};

export default Filters;
