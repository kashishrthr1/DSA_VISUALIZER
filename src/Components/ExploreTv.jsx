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
    <section className="w-full flex flex-col lg:flex-row gap-6 px-4 sm:px-6 mt-12">
      
      {/* Sidebar */}
     <div className="w-full lg:w-[250px] flex flex-col gap-4 lg:gap-6">
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
