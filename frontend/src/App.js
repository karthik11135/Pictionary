import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import GamingPage from "./components/pages/GamingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room/:roomId" element={<GamingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
