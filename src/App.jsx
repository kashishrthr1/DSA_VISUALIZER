import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import MainPage from "./Components/MainPage";
import ExplorePage from "./Components/ExplorePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/ExploreMore" element={<ExplorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
