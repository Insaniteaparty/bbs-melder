import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.config.js";
import App from "./App.jsx";
import { AbilitiesProvider } from "./contexts/Abilities.context.jsx";
import { CharacterProvider } from "./contexts/Character.context.jsx";
import { CommandsProvider } from "./contexts/Commands.context.jsx";
import { DarkProvider } from "./contexts/Dark.context.jsx";
import { WishlistProvider } from "./contexts/Wishlist.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkProvider>
      <CharacterProvider>
        <AbilitiesProvider>
          <CommandsProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CommandsProvider>
        </AbilitiesProvider>
      </CharacterProvider>
    </DarkProvider>
  </StrictMode>
);
