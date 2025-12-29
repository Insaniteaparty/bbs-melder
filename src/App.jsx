import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { darkTheme, lightTheme } from "./theme/theme.js";
import { ThemeProvider } from "@emotion/react";

import Navigator from "./routes/Navigator.route";
import Planner from "./routes/Planner.route";
import Recipes from "./routes/Recipes.route";
import Abilities from "./routes/Abilities.route";
import Discovered from "./routes/Discovered.route";
import { useDark } from "./contexts/Dark.context.jsx";

function App() {
  const { isDark } = useDark();

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigator />}>
            <Route index element={<Planner />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="abilities" element={<Abilities />} />
            <Route path="discovered" element={<Discovered />} />
            <Route path="*" element={<Planner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
