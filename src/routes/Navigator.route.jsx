import { useState } from "react";
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
} from "@mui/material";
import {
  Menu as MenuIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Blender as BlenderIcon,
  FitnessCenter as FitnessCenterIcon,
  SavedSearch as SavedSearchIcon,
} from "@mui/icons-material";

const drawerWidth = 240;
const closedDrawerWidth = 64;

function Navigator() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const routes = [
    { name: "planner", icon: <AssignmentTurnedInIcon /> },
    { name: "recipes", icon: <BlenderIcon /> },
    { name: "abilities", icon: <FitnessCenterIcon /> },
    { name: "discovered", icon: <SavedSearchIcon /> },
  ];

  const buttonCss = {
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
  };

  const iconCss = {
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center",
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
          <Typography variant="h6" noWrap component="div">
            BBS Melder
          </Typography>
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
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {routes.map((route) => (
                <ListItem
                  key={route.name}
                  disablePadding
                  onClick={() => navigate(route.name)}
                >
                  <Tooltip title={open ? "" : route.name} placement="right">
                    <ListItemButton sx={buttonCss}>
                      <ListItemIcon sx={iconCss}>{route.icon}</ListItemIcon>
                      {open && (
                        <ListItemText
                          style={{ textTransform: "capitalize" }}
                          primary={route.name}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          px: 3,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 BBS Melder. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Navigator;
