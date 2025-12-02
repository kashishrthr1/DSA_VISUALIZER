import "../App.css";
import generateArray from "../utils/generateArray.js";
// --- SORTING ALGORITHM IMPORTS ---
import { selectionSort } from "../algorithms/selectionSort.js";
import { bubbleSort } from "../algorithms/bubbleSort.js";
import { insertionSort } from "../algorithms/insertionSort.js";
import { quickSort } from "../algorithms/quickSort.js";
import { mergeSort } from "../algorithms/mergeSort.js";
import { heapSort } from "../algorithms/heapSort.js";
import { radixSort } from "../algorithms/radixSort.js";
// --- SEARCHING ALGORITHM IMPORTS (NEW) ---
import { linearSearch } from "../algorithms/linearSearch.js";
import { binarySearch } from "../algorithms/binarySearch.js";

import { useState, useEffect } from "react";

// Helper map to convert NavMain's full names to Controler's keys
const algoKeyMap = {
  "Selection Sort": "selection",
  "Bubble Sort": "bubble",
  "Insertion Sort": "insertion",
  "Quick Sort": "quick",
  "Merge Sort": "merge",
  "Heap Sort": "heap",
  "Radix Sort": "radix", // ADDED SEARCH ALGORITHMS
  "Linear Search": "linear",
  "Binary Search": "binary",
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
  selectedAlgorithm, // Full name from MainPage state // NEW PROPS FOR SEARCHING
  targetValue,
  setTargetValue,
}) {
  const speedOptions = [0.25, 0.5, 1, 2, 4, 8, 16];
  const selectedAlgoKey = algoKeyMap[selectedAlgorithm] || null;
  const isSearching = ["linear", "binary"].includes(selectedAlgoKey); // --- NEW LOCAL STATE FOR USER INPUT --- // Used to manage the text input fields

  const getRawArray = () => {
    if (Array.isArray(bars)) return bars;
    if (bars && Array.isArray(bars.bars)) return bars.bars;
    return [];
  };
  const [userInputArray, setUserInputArray] = useState(
    getRawArray().join(", ")
  );
  const [userInputTarget, setUserInputTarget] = useState(String(targetValue)); // Effect to keep local array input synced when the main array changes

  useEffect(() => {
    // Only update local input if not currently typing, or if array structure changes significantly
    if (steps.length === 0) {
      setUserInputArray(getRawArray().join(", "));
    }
  }, [bars, inputSize]); // Effect to keep local target input synced when main target changes

  useEffect(() => {
    setUserInputTarget(String(targetValue));
  }, [targetValue]); // ------------------------------------ // --- CORE LOGIC: Determines which algorithm function to call ---
  const buildStepsForSelectedAlgo = (arr, target) => {
    // SORTING ALGORITHMS
    if (selectedAlgoKey === "selection") return selectionSort(arr);
    if (selectedAlgoKey === "bubble") return bubbleSort(arr);
    if (selectedAlgoKey === "insertion") return insertionSort(arr);
    if (selectedAlgoKey === "quick") return quickSort(arr);
    if (selectedAlgoKey === "merge") return mergeSort(arr);
    if (selectedAlgoKey === "heap") return heapSort(arr);
    if (selectedAlgoKey === "radix") return radixSort(arr); // SEARCHING ALGORITHMS
    if (selectedAlgoKey === "linear") return linearSearch(arr, target);
    if (selectedAlgoKey === "binary") return binarySearch(arr, target);
    return [];
  }; // --- HANDLERS --- // 1. Custom Generate Handler for all array changes (replaces old Generate button logic)

  const handleGenerate = (useRandom = false) => {
    let newRawArray;
    let newTargetValue = Number(userInputTarget);

    if (isSearching) {
      // For Searching: Use user input array
      newRawArray = userInputArray
        .split(",")
        .map((s) => Number(s.trim()))
        .filter((n) => !isNaN(n) && n !== null); // Set input size based on parsed array
      setInputSize(newRawArray.length);
    } else if (useRandom) {
      // For Sorting (and Random button click): Generate array
      newRawArray = generateArray(inputSize);
      setUserInputArray(newRawArray.join(", ")); // Sync local input field
    } else {
      // Fallback for sorting: use the current array
      newRawArray = getRawArray();
    } // Update MainPage state

    setBars({ bars: newRawArray, comparing: [], swapping: [], found: [] });
    setTargetValue(newTargetValue); // Update target in MainPage state // Reset visualization

    setSteps([]);
    setCurrentStep(0);
    setPlaying(false);
  };

  const handlePlayPause = () => {
    // Prevent play if no visualization algorithm is selected
    if (!selectedAlgoKey) return; // If steps haven't been generated or we are at the end, generate and start

    if (steps.length === 0 || currentStep === steps.length - 1) {
      const raw = getRawArray(); // PASS TARGET VALUE TO STEP BUILDER
      const recordSteps = buildStepsForSelectedAlgo(raw, targetValue);

      if (recordSteps.length === 0) {
        setSteps([{ bars: [...raw], comparing: [], swapping: [] }]);
      } else {
        setSteps(recordSteps);
      }

      setCurrentStep(0);
      setPlaying(true);
      return;
    } // Toggle play/pause

    setPlaying((prev) => !prev);
  };

  const handleReplay = () => {
    if (steps.length > 0) {
      setCurrentStep(0);
      setBars(steps[0]);
      setPlaying(true);
    }
  };

  const handleSkipForward = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleSkipBackward = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-[1100px] h-[90px] bg-[rgba(18,18,24,0.85)] backdrop-blur-md rounded-3xl flex items-center px-8 space-x-8 border border-white/10 shadow-lg">
      {/* --- Playback Controls --- */}
      <div className="flex items-center space-x-4 text-white">
        <button
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition"
          onClick={handlePlayPause}
          disabled={!selectedAlgoKey}
        >
          {isPlaying && currentStep < steps.length - 1 ? (
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-xl transition"
          onClick={handleReplay}
          disabled={steps.length === 0}
        >
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M12 5V1L8 5l4 4V6c3.31 0 6 2.69 6 6a6 6 0 01-6 6c-2.22 0-4.15-1.21-5.19-3H4.26a8 8 0 0014.48 0A8 8 0 0012 5z" />
          </svg>
        </button>

        <button
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-xl transition"
          onClick={handleSkipBackward}
          disabled={currentStep === 0}
        >
          <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
            <path d="M18 6l-8.5 6L18 18V6zm-11 0H5v12h2V6z" />
          </svg>
        </button>

        <button
          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-xl transition"
          onClick={handleSkipForward}
          disabled={currentStep === steps.length - 1}
        >
          <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zm9-12h2v12h-2V6z" />
          </svg>
        </button>
      </div>

      {/* --- Speed Slider --- */}
      <div className="flex items-center space-x-3 text-white flex-1">
        <span className="text-[16px] font-mono">{speed}x</span>
        <input
          type="range"
          min="0"
          max={speedOptions.length - 1}
          step="1"
          value={speedOptions.indexOf(speed)}
          onChange={(e) => setSpeed(speedOptions[Number(e.target.value)])}
          className="w-[220px] accent-white cursor-pointer"
        />
      </div>

      {/* --- Inputs --- */}
      <div className="flex items-center space-x-6 text-white font-mono">
        {/* Array Input */}
        <div className="flex flex-col text-[13px]">
          <label className="opacity-80">Array</label>
          <input
            type="text"
            value={userInputArray}
            onChange={(e) => setUserInputArray(e.target.value)}
            className="w-[220px] px-2 py-1 text-center bg-white text-black rounded-lg shadow-sm mt-1"
          />
        </div>

        {/* Target Input (Searching Only) */}
        {isSearching && (
          <div className="flex flex-col text-[13px]">
            <label className="opacity-80">Target</label>
            <input
              type="number"
              value={userInputTarget}
              onChange={(e) => setUserInputTarget(e.target.value)}
              className="w-[100px] px-2 py-1 text-center bg-white text-black rounded-lg shadow-sm mt-1"
            />
          </div>
        )}

        {/* Random Size Input (Sorting Only) */}
        {!isSearching && (
          <div className="flex flex-col text-[13px]">
            <label className="opacity-80">n (size)</label>
            <input
              type="number"
              value={inputSize}
              onChange={(e) => setInputSize(Number(e.target.value))}
              className="w-[120px] px-2 py-1 text-center bg-white text-black rounded-lg shadow-sm mt-1"
            />
          </div>
        )}
      </div>

      {/* --- Generate Button --- */}
      <button
        className="px-6 py-2 bg-[#1b1b25] border border-white/20 text-white rounded-full font-mono text-[15px] hover:bg-white/10 transition shadow-md"
        onClick={() => handleGenerate(!isSearching)}
      >
        Generate
      </button>
    </div>
  );
}
