import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.config.js";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme.js";
import { AbilitiesProvider } from "./contexts/Abilities.context.jsx";
import { CharacterProvider } from "./contexts/Character.context.jsx";
import { CommandsProvider } from "./contexts/Commands.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CharacterProvider>
        <AbilitiesProvider>
          <CommandsProvider>
            <App />
          </CommandsProvider>
        </AbilitiesProvider>
      </CharacterProvider>
    </ThemeProvider>
  </StrictMode>
);
