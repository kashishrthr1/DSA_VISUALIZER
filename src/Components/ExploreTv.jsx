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
      <div className="w-[250px] flex flex-col gap-6 ml-10 ">
        <AlgoSearchbarButton />
        <AlgoCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Right Content */}
      <div className="flex-1 mb-16">
        {selectedCategory === "Sorting" && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 justify-items-center">
            <Sorting />
          </div>
        )}
        {selectedCategory === "Searching" && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 justify-items-center">
            <Searching />
          </div>
        )}
        {selectedCategory === "Tree" && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 justify-items-center">
            <Tree />
          </div>
        )}
        {selectedCategory === "Graph" && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 justify-items-center">
            <Graph />
          </div>
        )}
        {selectedCategory === "Dynamic Programming" && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 justify-items-center">
            <DynamicProgramming />
          </div>
        )}
        {selectedCategory === "Other" && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 justify-items-center">
            <Other />
          </div>
        )}
        {selectedCategory === "All" && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 justify-items-center">
            <Sorting />
            <Searching />
            <Tree />
            <Graph />
            <DynamicProgramming />
            <Other />
          </div>
        )}
      </div>
    </section>
  );
}
