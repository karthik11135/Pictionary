
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GamingPage from "./pages/GamingPage";
import RoomFull from "./pages/RoomFull";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room/:roomId/:player" element={<GamingPage />} />
        <Route path="/:roomId/roomIsFull" element={<RoomFull />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
