import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // or "light"
    primary: {
      main: "#012f8d",
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
    background: {
      default: "#1a1a1a", // Main background color
      paper: "#2a2a2a", // Paper/card background color
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
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
