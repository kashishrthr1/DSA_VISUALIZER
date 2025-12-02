import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Controler from "./Controler";
import NavMain from "./NavMain";
import ColorLegend from "./ColorLegend";
import BarsDisplay from "./BarsDisplay"; // New component
import CodeDisplay from "./CodeDisplay";
import SearchDisplay from "./SearchDisplay.jsx"; // New component

// Import all visualization code and external CSS dependencies
import { selectionSortCode } from "../algorithms/selectionSort.js";
import { bubbleSortCode } from "../algorithms/bubbleSort.js";
import { insertionSortCode } from "../algorithms/insertionSort.js";
import { quickSortCode } from "../algorithms/quickSort.js";
import { mergeSortCode } from "../algorithms/mergeSort.js";
import { heapSortCode } from "../algorithms/heapSort.js";
import { radixSortCode } from "../algorithms/radixSort.js";
import "../App.css";
import { linearSearchCode } from "../algorithms/linearSearch.js";
import { binarySearchCode } from "../algorithms/binarySearch.js";

// Helper map to convert NavMain's full names to Controler's keys for code display
const algoCodeKeyMap = {
  "Selection Sort": "selection",
  "Bubble Sort": "bubble",
  "Insertion Sort": "insertion",
  "Quick Sort": "quick",
  "Merge Sort": "merge",
  "Heap Sort": "heap", // Assuming 'Heapify' from Tree category maps to Heap Sort
  "Radix Sort": "radix",
  "Linear Search": "linear",
  "Binary Search": "binary", // Assuming 'Heapify' from Tree category maps to Heap Sort
};

const algoCodes = {
  selection: selectionSortCode,
  bubble: bubbleSortCode,
  insertion: insertionSortCode,
  quick: quickSortCode,
  merge: mergeSortCode,
  heap: heapSortCode,
  radix: radixSortCode,
  linear: linearSearchCode,
  binary: binarySearchCode,
  default: `// Select a sorting algorithm to view its visualization and code!`,
};

export default function MainPage() {
  const initialArr = [1, 69, 10, 82, 11, 25, 8, 14, 2, 51];

  // --- State from Main (Dropdowns) ---
  const location = useLocation();
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("Select Algorithm");
  const [selectedType, setSelectedType] = useState("Select Type");

  // --- State from Incoming (Visualization) ---
  const [isPlaying, setPlaying] = useState(false);
  const [bars, setBars] = useState({
    bars: initialArr,
    comparing: [],
    swapping: [],
  });
  const [inputSize, setInputSize] = useState(initialArr.length);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);

  const [targetValue, setTargetValue] = useState(11);

  // Determine the key for the current algorithm
  const selectedAlgorithmKey = algoCodeKeyMap[selectedAlgorithm] || null;

  // Effect 1: Handle navigation from ExplorePage (from Main)
  useEffect(() => {
    if (location.state?.selectedTitle) {
      const algoTitle = location.state.selectedTitle;
      setSelectedAlgorithm(algoTitle);

      if (algoTitle.toLowerCase().includes("sort")) setSelectedType("Sorting");
      else if (algoTitle.toLowerCase().includes("search"))
        setSelectedType("Searching");
      else if (algoTitle.toLowerCase().includes("tree"))
        setSelectedType("Tree");
      else if (algoTitle.toLowerCase().includes("graph"))
        setSelectedType("Graph");
      else if (algoTitle.toLowerCase().includes("dynamic"))
        setSelectedType("Dynamic Programming");
      else setSelectedType("Other");
    }
  }, [location.state]);

  // Effect 2: Playback interval (from Incoming)
  useEffect(() => {
    if (!selectedAlgorithmKey || !isPlaying || steps.length === 0) return;

    const interval = Math.max(10, Math.round(1000 / speed));
    const id = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(id);
        setPlaying(false);
        return prev;
      });
    }, interval);

    return () => clearInterval(id);
  }, [isPlaying, speed, steps, selectedAlgorithmKey]);

  // Effect 3: Update bars on step change (from Incoming)
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      setBars(steps[currentStep]);
    }
  }, [currentStep, steps]);

  // Effect 4: Reset steps when selected algorithm changes (from Incoming)
  useEffect(() => {
    setSteps([]);
    setCurrentStep(0);
    setPlaying(false);
    // Reset bars when algo changes (or if it changes to 'Select Algorithm')
    setBars({ bars: initialArr, comparing: [], swapping: [] });
  }, [selectedAlgorithmKey]);

  const currentLine = steps[currentStep]?.line || 0;
  const codeToDisplay = algoCodes[selectedAlgorithmKey] || algoCodes.default;

  console.log("Current Line:", currentLine);
  console.log(steps[0]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar (Main structure retained) */}
      <NavMain
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={setSelectedAlgorithm}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      <div className="flex-grow flex flex-col p-4 pt-8">
        {/* 2. Horizontal Display Row: ColorLegend, BarsDisplay, CodeDisplay */}
        <div className="flex justify-start items-start w-full gap-4 max-h-[450px]">
          {/* Color Legend (Fixed width) */}
          <div className="w-[200px]">
            <ColorLegend
              selectedAlgorithm={selectedAlgorithm}
              selectedType={selectedType}
            />
          </div>

          {/* Bars Display (Expands to fill space) */}
          {selectedType === "Sorting" && (
            <div className="flex-1 min-w-0">
              <BarsDisplay
                bars={bars}
                inputSize={inputSize}
                currenStep={currentStep}
                lastStep={steps.length - 1}
              />
            </div>
          )}

          {selectedType === "Searching" && (
            <div className="flex-1 min-w-0">
              <SearchDisplay
                bars={bars}
                selectedAlgorithm={selectedAlgorithm}
              ></SearchDisplay>
            </div>
          )}

          {/* Code Display (Fixed width) */}
          <div className="w-1/4 min-w-[300px]">
            <CodeDisplay code={codeToDisplay} currentLine={currentLine} />
          </div>
        </div>

        {/* 3. Controler (Below the horizontal row, centered) */}
        <div className="flex justify-center mt-auto py-4">
          <Controler
            bars={bars}
            setBars={setBars}
            inputSize={inputSize}
            setInputSize={setInputSize}
            isPlaying={isPlaying}
            setPlaying={setPlaying}
            steps={steps}
            setSteps={setSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            speed={speed}
            setSpeed={setSpeed}
            selectedAlgorithm={selectedAlgorithm}
            targetValue={targetValue}
            setTargetValue={setTargetValue} // Full name to Controler
          />
        </div>
      </div>
    </div>
  );
}
