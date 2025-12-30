import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import { Character } from "../model/Characters.model";

import { Menu as MenuIcon } from "@mui/icons-material";
import TerraAvatar from "../assets/terra.webp";
import VentusAvatar from "../assets/ventus.webp";
import AquaAvatar from "../assets/aqua.webp";
import battleTicketIcon from "../assets/battleTicket.webp";
import dimensionLinkIcon from "../assets/dimensionLink.webp";
import abilityIcon from "../assets/ability.webp";
import emblemIcon from "../assets/emblem.webp";
import bookIcon from "../assets/books.webp";
import { useCharacter } from "../contexts/Character.context";
import { useDark } from "../contexts/Dark.context";
import { useTranslation } from "react-i18next";

// Add your light/dark theme icons
import Nobody from "../assets/nobody.webp";
import Heartless from "../assets/heartless.webp";

const drawerWidth = 240;
const closedDrawerWidth = 64;

const routes = [
  { name: "planner", icon: battleTicketIcon },
  { name: "recipes", icon: bookIcon },
  { name: "wishlist", icon: dimensionLinkIcon },
  { name: "abilities", icon: abilityIcon },
  { name: "discovered", icon: emblemIcon },
];

const buttonCss = {
  minHeight: 48,
  justifyContent: open ? "initial" : "center",
};

const iconCss = {
  minWidth: 0,
  mr: open ? 3 : "auto",
  justifyContent: "center",
};

const selectAvatar = (char) => {
  switch (char) {
    case Character.Terra:
      return TerraAvatar;
    case Character.Ventus:
      return VentusAvatar;
    case Character.Aqua:
      return AquaAvatar;
    default:
      return null;
  }
};

function Navigator() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { character, setCharacter } = useCharacter();
  const { isDark, toggleDark } = useDark();
  const navigate = useNavigate();

  const getOtherCharacters = () => {
    return Object.values(Character).filter((char) => char !== character);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleCharacterMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCharacterMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCharacterSelect = (newCharacter) => {
    setCharacter(newCharacter);
    handleCharacterMenuClose();
  };

  const avatarSizing = () => {
    return isDark ? { width: 32, height: 32 } : { width: 32, height: 32 };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontFamily={"KHGummi"}
          >
            BBS Melder
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip
            title={isDark ? t("labels.lightMode") : t("labels.darkMode")}
          >
            <IconButton color="inherit" edge="end" onClick={toggleDark}>
              <Avatar
                src={isDark ? Nobody : Heartless}
                alt={isDark ? "Switch to light mode" : "Switch to dark mode"}
                sx={{ width: 32, height: 32 }}
                slotProps={{
                  img: {
                    sx: {
                      objectFit: "contain",
                    },
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flex: 1 }}>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : closedDrawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : closedDrawerWidth,
              transition: (theme) =>
                theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              boxSizing: "border-box",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto", flexGrow: 1 }}>
            <List>
              {routes.map((route) => (
                <ListItem
                  key={route.name}
                  disablePadding
                  onClick={() => navigate(route.name)}
                >
                  <Tooltip
                    title={open ? "" : t(`labels.${route.name}`)}
                    placement="right"
                    slotProps={{
                      tooltip: {
                        sx: { textTransform: "capitalize" },
                      },
                    }}
                  >
                    <ListItemButton sx={buttonCss}>
                      <ListItemIcon sx={iconCss}>
                        <Avatar
                          src={route.icon}
                          alt={route.name}
                          sx={{ width: 32, height: 32 }}
                        />
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          style={{ textTransform: "capitalize" }}
                          primary={t(`labels.${route.name}`)}
                          slotProps={{
                            primary: {
                              sx: {
                                color: (theme) =>
                                  theme.typography.onBackground.color,
                                textShadow: (theme) =>
                                  theme.typography.onBackground.textShadow,
                              },
                            },
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider />
          <List>
            <ListItem disablePadding>
              <Tooltip title={open ? "" : "change character"} placement="right">
                <ListItemButton
                  sx={buttonCss}
                  onClick={handleCharacterMenuOpen}
                >
                  <ListItemIcon sx={iconCss}>
                    <Avatar
                      src={selectAvatar(character)}
                      alt={character}
                      sx={{ width: 32, height: 32 }}
                    />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={character}
                      slotProps={{
                        primary: {
                          sx: {
                            color: (theme) =>
                              theme.typography.onBackground.color,
                            textShadow: (theme) =>
                              theme.typography.onBackground.textShadow,
                          },
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </List>
        </Drawer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCharacterMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{ vertical: "bottom", horizontal: "left" }}
          slotProps={{
            paper: {
              sx: {
                width: drawerWidth - 36,
              },
            },
          }}
        >
          {getOtherCharacters().map((char) => (
            <MenuItem key={char} onClick={() => handleCharacterSelect(char)}>
              <Avatar
                src={selectAvatar(char)}
                sx={{
                  mr: 2,
                  width: 32,
                  height: 32,
                }}
              />
              {char}
            </MenuItem>
          ))}
        </Menu>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Navigator;
