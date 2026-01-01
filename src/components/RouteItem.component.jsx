import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

import { clip } from "../theme/shapes.theme";

const buttonCss = {
  minHeight: 48,
  justifyContent: open ? "initial" : "center",
};

const RouteItem = ({ route, open, focused, setFocused }) => {
  const navigate = useNavigate();

  const iconCss = {
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center",
  };

  return (
    <ListItem
      key={route.name}
      disablePadding
      onClick={() => navigate(route.name)}
    >
      <Tooltip
        title={open ? "" : route.label}
        placement="right"
        slotProps={{
          tooltip: {
            sx: { textTransform: "capitalize" },
          },
        }}
      >
        <ListItemButton
          sx={buttonCss}
          onMouseEnter={() => {
            setFocused(route.name);
          }}
          onMouseLeave={() => {
            setFocused(null);
          }}
        >
          <ListItemIcon sx={iconCss}>
            <Avatar
              src={route.icon}
              alt={route.name}
              sx={{ width: 32, height: 32 }}
            />
          </ListItemIcon>
          {open && (
            <Box
              display={"flex"}
              flex={1}
              sx={{
                py: "1px",
                clipPath: clip.menuItem,
                background:
                  "linear-gradient(rgba(255,255,255,0.2), rgba(0,0,0,0.2))",
              }}
            >
              <Box
                flex={1}
                sx={{
                  pl: 2,
                  clipPath: clip.menuItem,
                  backgroundColor: (theme) => theme.palette.background.paper,
                  ...(focused === route.name && {
                    background: (theme) =>
                      `linear-gradient(#000 0%, #000 20%,  ${theme.palette.error.light} 100%)`,
                  }),
                }}
              >
                <ListItemText
                  style={{ textTransform: "capitalize" }}
                  primary={route.label}
                  slotProps={{
                    primary: {
                      sx: {
                        ...(focused !== route.name && {
                          color: (theme) => theme.typography.onBackground.color,
                          textShadow: (theme) =>
                            theme.typography.onBackground.textShadow,
                        }),
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default RouteItem;
