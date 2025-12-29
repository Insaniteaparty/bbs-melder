import { createTheme } from "@mui/material/styles";

const baseThemeConfig = {
  palette: {
    primary: {
      main: "#012f8d",
      light: "#017bec",
    },
    secondary: {
      main: "#6c757d",
    },
    success: {
      main: "#28a745",
    },
    error: {
      main: "#dc3545",
    },
    warning: {
      main: "#ffc107",
    },
    info: {
      main: "#17a2b8",
    },
    deactivated: {
      main: "#555555",
    },
  },
  typography: {
    fontFamily:
      '"KHFont", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    allVariants: {
      color: "#ffffff",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    },
  },
  shape: {
    borderRadius: 8,
  },
};

const darkTheme = createTheme({
  ...baseThemeConfig,
  palette: {
    ...baseThemeConfig.palette,
    mode: "dark",
    background: {
      default: "#1a1a1a",
      paper: "#2a2a2a",
    },
  },
  typography: {
    ...baseThemeConfig.typography,
    onBackground: {
      ...baseThemeConfig.typography.allVariants,
    },
  },
});

const lightTheme = createTheme({
  ...baseThemeConfig,
  palette: {
    ...baseThemeConfig.palette,
    mode: "light",
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    ...baseThemeConfig.typography,
    onBackground: {
      color: "#000000",
      textShadow: "1px 1px 2px rgba(255,255,255,0.5)",
    },
  },
});

export { darkTheme, lightTheme };
