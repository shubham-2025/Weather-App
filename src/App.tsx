import "./App.css";
import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Citypage from "./pages/Citypage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/city/:city" element={<Citypage />} />
    </Routes>
  );
}

export default App;
