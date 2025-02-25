import "./App.css";
import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Citypage from "./pages/Citypage";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="/" element={<Homepage />} />
      <Route path="/city/:city" element={<Citypage />} />
      </Route>
    </Routes>
  );
}

export default App;
