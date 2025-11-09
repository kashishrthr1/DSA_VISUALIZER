import { useState } from "react";
import AlgoCategory from "./AlgoCategory";
import AlgoSearchbarButton from "./AlgoSearchbarButton";
import Sorting from "./Sorting";
import Searching from "./Searching";
import Tree from "./Tree";
import Graph from "./Graph";
import DynamicProgramming from "./DynamicProgramming";
import Other from "./Other";

export default function ExploreTv() {
  const [selectedCategory, setSelectedCategory] = useState("Sorting");

  return (
    <section className="w-full flex gap-6 px-8 mt-12">
      {/* Left Sidebar */}
      <div className="w-[250px] flex flex-col gap-6">
        <AlgoSearchbarButton />
        <AlgoCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Right Content */}
      <div className="flex-1">
        {selectedCategory === "Sorting" && <Sorting />}
        {selectedCategory === "Searching" && <Searching />}
        {selectedCategory === "Tree" && <Tree />}
        {selectedCategory === "Graph" && <Graph />}
        {selectedCategory === "Dynamic Programming" && <DynamicProgramming />}
        {selectedCategory === "Other" && <Other />}
        {selectedCategory === "All" && (
          <>
            <Sorting />
            <Searching />
            <Tree />
            <Graph />
            <DynamicProgramming />
            <Other />
          </>
        )}
      </div>
    </section>
  );
}
