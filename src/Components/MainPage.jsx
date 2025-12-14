import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Controler from "./Controler";
import NavMain from "./NavMain";
import ColorLegend from "./ColorLegend";
import BarsDisplay from "./BarsDisplay";
import CodeDisplay from "./CodeDisplay";
import SearchDisplay from "./SearchDisplay.jsx";
import TreeDisplay from "./TreeDisplay";
import GraphDisplay from "./GraphDisplay";

// Algorithm imports
import { selectionSortCode } from "../algorithms/selectionSort.js";
import { bubbleSortCode } from "../algorithms/bubbleSort.js";
import { insertionSortCode } from "../algorithms/insertionSort.js";
import { quickSortCode } from "../algorithms/quickSort.js";
import { mergeSortCode } from "../algorithms/mergeSort.js";
import { heapSortCode } from "../algorithms/heapSort.js";
import { radixSortCode } from "../algorithms/radixSort.js";
import { linearSearchCode } from "../algorithms/linearSearch.js";
import { binarySearchCode } from "../algorithms/binarySearch.js";

// Tree algorithms
import { treeTraversalCode } from "../algorithms/treeTraversal.js";
import { bstInsertionCode } from "../algorithms/bstInsertion.js";
import { avlInsertionCode } from "../algorithms/avlInsertion.js";
import { trieInsertionCode } from "../algorithms/trieInsertion.js";
import { segmentTreeBuildCode } from "../algorithms/segmentTreeBuild.js";

// Graph algorithms
import { bfsCode } from "../algorithms/bfs.js";
import { dfsCode } from "../algorithms/dfs.js";
import { dijkstraCode } from "../algorithms/dijkstra.js";
import { kruskalCode } from "../algorithms/kruskal.js";
import { primsCode } from "../algorithms/prims.js";

import "../App.css";

const algoCodeKeyMap = {
  "Selection Sort": "selection",
  "Bubble Sort": "bubble",
  "Insertion Sort": "insertion",
  "Quick Sort": "quick",
  "Merge Sort": "merge",
  "Heap Sort": "heap",
  "Radix Sort": "radix",
  "Linear Search": "linear",
  "Binary Search": "binary",
  "Binary Tree Traversal": "treeTraversal",
  "BST Insertion": "bstInsertion",
  "AVL Insertion": "avlInsertion",
  "Trie Insertion": "trieInsertion",
  "Segment Tree Build": "segmentTreeBuild",
  "Depth First Search": "dfs",
  "Breadth First Search": "bfs",
  "Dijkstra's Algorithm": "dijkstra",
  "Kruskal's Algorithm": "kruskal",
  "Prim's Algorithm": "prims",
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
  treeTraversal: treeTraversalCode,
  bstInsertion: bstInsertionCode,
  avlInsertion: avlInsertionCode,
  trieInsertion: trieInsertionCode,
  segmentTreeBuild: segmentTreeBuildCode,
  bfs: bfsCode,
  dfs: dfsCode,
  dijkstra: dijkstraCode,
  kruskal: kruskalCode,
  prims: primsCode,
  default: `// Select an algorithm to view visualization!`,
};

export default function MainPage() {
  const initialArr = [1, 69, 10, 82, 11, 25, 8, 14, 2, 51];

  const location = useLocation();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Select Algorithm");
  const [selectedType, setSelectedType] = useState("Select Type");
  const [isPlaying, setPlaying] = useState(false);
  const [bars, setBars] = useState({
    bars: initialArr,
    comparing: [],
    swapping: [],
    root: null,
    nodes: [],
    edges: [],
  });
  const [inputSize, setInputSize] = useState(initialArr.length);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [targetValue, setTargetValue] = useState(11);

  const selectedAlgorithmKey = algoCodeKeyMap[selectedAlgorithm] || null;

  // Set selectedAlgorithm on navigation
  useEffect(() => {
    if (location.state?.selectedTitle) {
      const algoTitle = location.state.selectedTitle;
      setSelectedAlgorithm(algoTitle);

      const titleLower = algoTitle.toLowerCase();

      if (
        titleLower.includes("dijkstra") ||
        titleLower.includes("kruskal") ||
        titleLower.includes("prims") ||
        titleLower.includes("depth first") ||
        titleLower.includes("breadth first")
      ) {
        setSelectedType("Graph");
      } else if (titleLower.includes("sort")) {
        setSelectedType("Sorting");
      } else if (titleLower.includes("search")) {
        setSelectedType("Searching");
      } else if (
        titleLower.includes("tree") ||
        titleLower.includes("bst") ||
        titleLower.includes("avl") ||
        titleLower.includes("trie")
      ) {
        setSelectedType("Tree");
      } else if (titleLower.includes("dynamic")) {
        setSelectedType("Dynamic Programming");
      } else {
        setSelectedType("Other");
      }
    }
  }, [location.state]);

  // Playback effect
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

  // Step update
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      setBars(steps[currentStep]);
    }
  }, [currentStep, steps]);

  // Reset on algorithm change
  useEffect(() => {
    setSteps([]);
    setCurrentStep(0);
    setPlaying(false);
    setBars({
      bars: initialArr,
      comparing: [],
      swapping: [],
      root: null,
      nodes: [],
      edges: [],
    });
  }, [selectedAlgorithmKey]);

  const currentLine = steps[currentStep]?.line || 0;
  const codeToDisplay = algoCodes[selectedAlgorithmKey] || algoCodes.default;

  return (
    <div className="flex flex-col min-h-screen">
      <NavMain
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={setSelectedAlgorithm}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {/* Main content */}
      <div className="flex-grow flex flex-col p-4 pt-8">
        {/* Visualization + Legend + Code */}
        <div className="flex flex-col sm:flex-row flex-wrap w-full gap-4 max-h-full">
          {/* Legend */}
          <div className="w-full sm:w-[200px] min-w-0">
            <ColorLegend
              selectedAlgorithm={selectedAlgorithm}
              selectedType={selectedType}
            />
          </div>

          {/* Visualization */}
          <div className="flex-1 min-w-0">
            {selectedType === "Sorting" && (
              <BarsDisplay
                bars={bars}
                inputSize={inputSize}
                currentStep={currentStep}
                lastStep={steps.length - 1}
              />
            )}
            {selectedType === "Searching" && (
              <SearchDisplay bars={bars} selectedAlgorithm={selectedAlgorithm} />
            )}
            {selectedType === "Tree" && (
              <TreeDisplay treeState={bars} selectedAlgorithm={selectedAlgorithm} />
            )}
            {selectedType === "Graph" && (
              <GraphDisplay graphState={bars} selectedAlgorithm={selectedAlgorithm} />
            )}
          </div>

          {/* Code Display */}
          <div className="w-full sm:w-1/4 min-w-0">
            <CodeDisplay code={codeToDisplay} currentLine={currentLine} />
          </div>
        </div>

        {/* Controller */}
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
            setTargetValue={setTargetValue}
          />
        </div>
      </div>
    </div>
  );
}
