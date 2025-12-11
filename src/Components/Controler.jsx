// src/components/Controler.jsx

import "../App.css";
import generateArray from "../utils/generateArray.js";
import { generateGraphFromInput } from "../utils/generateGraphFromInput.js";
import React, { useState, useEffect } from "react";

// SORTS
import { selectionSort } from "../algorithms/selectionSort.js";
import { bubbleSort } from "../algorithms/bubbleSort.js";
import { insertionSort } from "../algorithms/insertionSort.js";
import { quickSort } from "../algorithms/quickSort.js";
import { mergeSort } from "../algorithms/mergeSort.js";
import { heapSort } from "../algorithms/heapSort.js";
import { radixSort } from "../algorithms/radixSort.js";

// SEARCH
import { linearSearch } from "../algorithms/linearSearch.js";
import { binarySearch } from "../algorithms/binarySearch.js";

// TREES
import { treeTraversal } from "../algorithms/treeTraversal.js";
import { bstInsertion } from "../algorithms/bstInsertion.js";
import { avlInsertion } from "../algorithms/avlInsertion.js";
import { trieInsertion } from "../algorithms/trieInsertion.js";
import { segmentTreeBuild } from "../algorithms/segmentTreeBuild.js";

// GRAPHS
import { bfs } from "../algorithms/bfs.js";
import { dfs } from "../algorithms/dfs.js";
import { dijkstra } from "../algorithms/dijkstra.js";
import { kruskal } from "../algorithms/kruskal.js";
import { prims } from "../algorithms/prims.js";

const algoKeyMap = {
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
  "Breadth First Search": "bfs",
  "Depth First Search": "dfs",
  "Dijkstra's Algorithm": "dijkstra",
  "Kruskal's Algorithm": "kruskal",
  "Prim's Algorithm": "prims",
};

export default function Controler({
  bars,
  setBars,
  inputSize,
  setInputSize,
  isPlaying,
  setPlaying,
  steps,
  setSteps,
  currentStep,
  setCurrentStep,
  speed,
  setSpeed,
  selectedAlgorithm,
  targetValue,
  setTargetValue,
}) {
  const speedOptions = [0.25, 0.5, 1, 2, 4, 8, 16];
  const selectedAlgoKey = algoKeyMap[selectedAlgorithm] || null;

  const isSorting = [
    "selection",
    "bubble",
    "insertion",
    "quick",
    "merge",
    "heap",
    "radix",
  ].includes(selectedAlgoKey);
  const isSearching = ["linear", "binary"].includes(selectedAlgoKey);
  const isTree = [
    "treeTraversal",
    "bstInsertion",
    "avlInsertion",
    "trieInsertion",
    "segmentTreeBuild",
  ].includes(selectedAlgoKey);
  const isGraph = ["bfs", "dfs", "dijkstra", "kruskal", "prims"].includes(
    selectedAlgoKey
  );

  const parseNodes = (input) => {
    return input
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => !isNaN(n));
  };

  const [userInputArray, setUserInputArray] = useState(
    (bars?.bars || []).join(", ") || "1, 2, 3"
  );
  const [userInputTarget, setUserInputTarget] = useState(
    String(targetValue || 1)
  );
  const [edgeInput, setEdgeInput] = useState("");

  useEffect(() => {
    if (steps.length === 0 && bars?.bars) {
      setUserInputArray(bars.bars.join(", "));
    }
  }, [bars, steps.length]);

  const buildStepsForSelectedAlgo = (nodes, target, edgesString) => {
    if (isSorting || isSearching) {
      if (selectedAlgoKey === "selection") return selectionSort(nodes);
      if (selectedAlgoKey === "bubble") return bubbleSort(nodes);
      if (selectedAlgoKey === "insertion") return insertionSort(nodes);
      if (selectedAlgoKey === "quick") return quickSort(nodes);
      if (selectedAlgoKey === "merge") return mergeSort(nodes);
      if (selectedAlgoKey === "heap") return heapSort(nodes);
      if (selectedAlgoKey === "radix") return radixSort(nodes);
      if (selectedAlgoKey === "linear") return linearSearch(nodes, target);
      if (selectedAlgoKey === "binary") return binarySearch(nodes, target);
    }

    if (isGraph) {
      if (selectedAlgoKey === "bfs") return bfs(nodes, edgesString, target);
      if (selectedAlgoKey === "dfs") return dfs(nodes, edgesString, target);
      if (selectedAlgoKey === "dijkstra")
        return dijkstra(nodes, edgesString, target);
      if (selectedAlgoKey === "kruskal") return kruskal(nodes, edgesString);
      if (selectedAlgoKey === "prims") return prims(nodes, edgesString, target);
    }

    if (isTree) {
      if (selectedAlgoKey === "treeTraversal") return treeTraversal(nodes);
      if (selectedAlgoKey === "bstInsertion") return bstInsertion(nodes);
      if (selectedAlgoKey === "avlInsertion") return avlInsertion(nodes);
      if (selectedAlgoKey === "trieInsertion") return trieInsertion(nodes);
      if (selectedAlgoKey === "segmentTreeBuild")
        return segmentTreeBuild(nodes);
    }

    return [];
  };

  const handleGenerate = () => {
    const nodes = parseNodes(userInputArray);

    if (isGraph) {
      if (nodes.length === 0) {
        alert("Graph nodes cannot be empty.");
        return;
      }

      const { nodes: structuredNodes, edges: structuredEdges } =
        generateGraphFromInput(nodes, edgeInput);

      setBars({
        bars: nodes,
        comparing: [],
        swapping: [],
        found: [],
        nodes: structuredNodes,
        edges: structuredEdges,
        root: null,
      });
    } else if (isSorting) {
      const finalNodes =
        nodes.length > 0 && nodes.length === inputSize
          ? nodes
          : generateArray(inputSize);

      setUserInputArray(finalNodes.join(", "));

      setBars({
        bars: finalNodes,
        comparing: [],
        swapping: [],
        found: [],
        nodes: [],
        edges: [],
        root: null,
      });
    }

    setSteps([]);
    setCurrentStep(0);
    setPlaying(false);
  };

  const handlePlayPause = () => {
    if (!selectedAlgoKey) return;

    if (steps.length === 0 || currentStep === steps.length - 1) {
      const nodes = parseNodes(userInputArray);
      const target = Number(userInputTarget);

      const newSteps = buildStepsForSelectedAlgo(nodes, target, edgeInput);

      if (newSteps.length === 0) {
        setPlaying(false);
        return;
      }

      setSteps(newSteps);
      setBars(newSteps[0]);
      setCurrentStep(0);
      setPlaying(true);
      return;
    }

    setPlaying((p) => !p);
  };

  return (
    <div className="w-full h-[120px] bg-[rgba(18,18,24,0.85)] backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl px-6 flex items-center justify-between space-x-6 overflow-hidden">
      {/* LEFT CONTROLS */}
      <div className="flex items-center space-x-3 text-white shrink-0">
        <button
          onClick={handlePlayPause}
          className="w-10 h-10 hover:bg-white/10 rounded-xl flex items-center justify-center"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <button
          onClick={() => setCurrentStep(0)}
          className="w-9 h-9 hover:bg-white/10 rounded-xl flex items-center justify-center"
        >
          ⟳
        </button>

        <button
          onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
          className="w-9 h-9 hover:bg-white/10 rounded-xl flex items-center justify-center"
        >
          ⟸
        </button>

        <button
          onClick={() =>
            setCurrentStep((p) => Math.min(steps.length - 1, p + 1))
          }
          className="w-9 h-9 hover:bg-white/10 rounded-xl flex items-center justify-center"
        >
          ⟹
        </button>
      </div>

      {/* SPEED SLIDER */}
      <div className="flex items-center space-x-3 text-white flex-1 max-w-[260px]">
        <span>{speed}x</span>
        <input
          type="range"
          min="0"
          max={speedOptions.length - 1}
          value={speedOptions.indexOf(speed)}
          onChange={(e) => setSpeed(speedOptions[e.target.value])}
          className="w-full accent-white"
        />
      </div>

      {/* INPUTS */}
      <div className="flex items-center space-x-5 text-white font-mono flex-wrap">
        <div>
          <label className="text-sm block opacity-70 mb-1">Nodes</label>
          <input
            value={userInputArray}
            onChange={(e) => setUserInputArray(e.target.value)}
            className="w-[150px] bg-white text-black rounded-lg px-2 py-1"
          />
        </div>

        {isGraph && (
          <div>
            <label className="text-sm block opacity-70 mb-1">
              Edges (u-v:w)
            </label>
            <input
              value={edgeInput}
              onChange={(e) => setEdgeInput(e.target.value)}
              className="w-[150px] bg-white text-black rounded-lg px-2 py-1"
              placeholder="1-2, 2-3:5"
            />
          </div>
        )}

        {(isSearching || isGraph) && !isTree && (
          <div>
            <label className="text-sm block opacity-70 mb-1">
              Target / Start
            </label>
            <input
              type="number"
              value={userInputTarget}
              onChange={(e) => setUserInputTarget(e.target.value)}
              className="w-[80px] bg-white text-black rounded-lg px-2 py-1"
            />
          </div>
        )}

        {isSorting && (
          <div>
            <label className="text-sm block opacity-70 mb-1">Size</label>
            <input
              type="number"
              value={inputSize}
              onChange={(e) => setInputSize(Number(e.target.value))}
              className="w-[70px] bg-white text-black rounded-lg px-2 py-1"
            />
          </div>
        )}
      </div>

      {/* GENERATE BUTTON — FIXED POSITION */}
      <button
        onClick={handleGenerate}
        className="px-6 py-2 bg-[#1b1b25] border border-white/20 text-white rounded-full hover:bg-[#22222e] shrink-0 transition-all"
      >
        Generate
      </button>
    </div>
  );
}
