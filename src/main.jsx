import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.config.js";
import App from "./App.jsx";
import { AbilitiesProvider } from "./contexts/Abilities.context.jsx";
import { CharacterProvider } from "./contexts/Character.context.jsx";
import { CommandsProvider } from "./contexts/Commands.context.jsx";
import { DarkProvider } from "./contexts/Dark.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkProvider>
      <CharacterProvider>
        <AbilitiesProvider>
          <CommandsProvider>
            <App />
          </CommandsProvider>
        </AbilitiesProvider>
      </CharacterProvider>
    </DarkProvider>
  </StrictMode>
);
