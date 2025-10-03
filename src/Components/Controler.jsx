import React from "react";
import "../App.css";
import generateArray from "../utils/generateArray.js";
import { selectionSort } from "../algorithms/selectionSort.js";
import { bubbleSort } from "../algorithms/bubbleSort.js";
import { insertionSort } from "../algorithms/insertionSort.js";

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
  selectedAlgo,
}) {
  const speedOptions = [0.25, 0.5, 1, 2, 4, 8, 16];

  const getRawArray = () => {
    if (Array.isArray(bars)) return bars;
    if (bars && Array.isArray(bars.bars)) return bars.bars;
    return [];
  };

  const buildStepsForSelectedAlgo = (arr) => {
    if (selectedAlgo === "selection") return selectionSort(arr);
    if (selectedAlgo === "bubble") return bubbleSort(arr);
    if (selectedAlgo === "insertion") return insertionSort(arr);
    return [];
  };

  const handlePlayPause = () => {
    if (steps.length === 0) {
      const raw = getRawArray();
      const recordSteps = buildStepsForSelectedAlgo(raw);

      // ensure at least initial snapshot exists so UI can show something
      if (recordSteps.length === 0) {
        setSteps([{ bars: [...raw], comparing: [], swapping: [] }]);
      } else {
        setSteps(recordSteps);
      }

      setCurrentStep(0);
      setPlaying(true); // start playing immediately after generating steps
      return;
    }

    // toggle play/pause if steps already exist
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
    <div className="playback-fixed">
      <div className="w-[800px] h-[84px] bg-[rgba(18,18,24,0.75)] rounded-[36px] flex items-center px-6 space-x-6">
        <div className="flex items-center space-x-4 text-white">
          <button
            className="w-10 h-10 flex items-center justify-center"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
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
            className="w-9 h-9 flex items-center justify-center"
            onClick={handleReplay}
          >
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M12 5V1L8 5l4 4V6c3.31 0 6 2.69 6 6a6 6 0 01-6 6c-2.22 0-4.15-1.21-5.19-3H4.26a8 8 0 0014.48 0A8 8 0 0012 5z" />
            </svg>
          </button>

          <button
            className="w-9 h-9 flex items-center justify-center"
            onClick={handleSkipBackward}
          >
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
              <path d="M18 6l-8.5 6L18 18V6zm-11 0H5v12h2V6z" />
            </svg>
          </button>

          <button
            className="w-9 h-9 flex items-center justify-center"
            onClick={handleSkipForward}
          >
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zm9-12h2v12h-2V6z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-white flex-1">
          <span className="text-[16px] font-['IBM Plex Mono']">{speed}x</span>
          <input
            type="range"
            min="0"
            max={speedOptions.length - 1}
            step="1"
            value={speedOptions.indexOf(speed)}
            onChange={(e) => setSpeed(speedOptions[Number(e.target.value)])}
            className="w-[200px] accent-white"
          />
        </div>

        <button
          className="px-6 py-2 bg-[#121218] border-2 border-white text-white rounded-full font-['IBM_Plex_Mono'] text-[16px]"
          onClick={() => {
            const array = generateArray(inputSize);
            setBars({ bars: array, comparing: [], swapping: [] });
            setSteps([]);
            setCurrentStep(0);
            setPlaying(false);
          }}
        >
          Generate
        </button>

        <div className="flex items-center space-x-2 text-white font-['IBM_Plex_Mono'] ">
          <span>n =</span>
          <input
            type="number"
            value={inputSize}
            className="w-[60px] h-[30px] text-center text-black rounded bg-white"
            onChange={(e) => setInputSize(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
