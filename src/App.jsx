import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navigator from "./routes/Navigator.route";
import Planner from "./routes/Planner.route";
import Recipes from "./routes/Recipes.route";
import Abilities from "./routes/Abilities.route";
import Discovered from "./routes/Discovered.route";

function App() {
  return (
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
  );
}

export default App;
