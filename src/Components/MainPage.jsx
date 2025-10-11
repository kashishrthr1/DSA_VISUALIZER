import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Controler from "./Controler";
import NavMain from "./NavMain";
import ColorLegend from "./ColorLegend";

export default function MainPage() {
  const location = useLocation();

  // Dropdown states
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Select Algorithm");
  const [selectedType, setSelectedType] = useState("Select Type");

  // Update dropdowns when navigated from a card
  useEffect(() => {
    if (location.state?.selectedTitle) {
      const algoTitle = location.state.selectedTitle;
      setSelectedAlgorithm(algoTitle);

      // Detect algorithm category automatically
      if (algoTitle.toLowerCase().includes("sort")) setSelectedType("Sorting");
      else if (algoTitle.toLowerCase().includes("search")) setSelectedType("Searching");
      else if (algoTitle.toLowerCase().includes("tree")) setSelectedType("Tree");
      else if (algoTitle.toLowerCase().includes("graph")) setSelectedType("Graph");
      else if (algoTitle.toLowerCase().includes("dynamic")) setSelectedType("Dynamic Programming");
      else setSelectedType("Other");
    }
  }, [location.state]);

  return (
    <div className="w-full min-h-screen">
      {/* Navbar with both dropdowns */}
      <NavMain
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={setSelectedAlgorithm}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />
       <div className="absolute left-6 top-[100px]">
        <ColorLegend />
      </div>
      {/* Visualizer / Control section */}
      <Controler
        selectedAlgorithm={selectedAlgorithm}
        selectedType={selectedType}
      />
    </div>
  );
}
