import { Box, List, ListItem, ListItemText, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";

import { abilities, AbilityType } from "../model/Abilities.model";
import { useAbilities } from "../contexts/Abilities.context";

import abilityPrize from "../assets/abilityPrize.webp";
import abilityStat from "../assets/abilityStat.webp";
import abilitySupport from "../assets/abilitySupport.webp";
import activeAbility from "../assets/activeAbility.webp";
import inactiveAbility from "../assets/inactiveAbility.webp";

const Abilities = () => {
  const { t } = useTranslation();

  const { addAbility, removeAbility, getAbilityCount } = useAbilities();

  const underlineColor = (type) => {
    switch (type) {
      case AbilityType.Prize:
        return "#cbbd36";
      case AbilityType.Stat:
        return "#2e91d2";
      case AbilityType.Support:
        return "#bc0a08";
      default:
        return "divider";
    }
  };

  const tileCss = (type) => ({
    borderRadius: 10,
    border: 1,
    borderColor: "divider",
    mb: 1,
    color: "primary.contrastText",
    background: "linear-gradient(rgb(51, 51, 51), rgb(170, 170, 170))",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 10,
      left: 8,
      right: 8,
      height: 2,
      bgcolor: underlineColor(type),
      borderRadius: 10,
      zIndex: 1,
    },
  });

  const getAbilityIcon = (type) => {
    switch (type) {
      case AbilityType.Prize:
        return abilityPrize;
      case AbilityType.Stat:
        return abilityStat;
      case AbilityType.Support:
        return abilitySupport;
      default:
        return null;
    }
  };

  const clickAbility = (ability, index) => {
    const currentCount = getAbilityCount(ability.name);
    if (index < currentCount) {
      removeAbility(ability.name);
    } else {
      addAbility(ability.name);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <List>
        {abilities.map((ability) => (
          <ListItem key={ability.name} sx={() => tileCss(ability.type)}>
            <Avatar
              src={getAbilityIcon(ability.type)}
              alt=""
              sx={{ mr: 2, width: 32, height: 32, zIndex: 2 }}
            />
            <ListItemText
              primary={t(`abilities.${ability.name}`)}
              sx={{ zIndex: 2 }}
            />
            <Box sx={{ display: "flex", gap: 0.5, ml: "auto" }}>
              {Array.from({ length: ability.limit }).map((_, index) => (
                <Avatar
                  key={index}
                  onClick={() => clickAbility(ability, index)}
                  src={
                    index < getAbilityCount(ability.name)
                      ? activeAbility
                      : inactiveAbility
                  }
                  alt=""
                  sx={{ width: 28, height: 28, cursor: "pointer", zIndex: 2 }}
                />
              ))}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Abilities;
