import React, { useState, useEffect } from "react";
import Controler from "./Controler";
import NavMain from "./NavMain";
import BarsDisplay from "./BarsDisplay";
import CodeDisplay from "./CodeDisplay";
import {
  selectionSort,
  selectionSortCode,
} from "../algorithms/selectionSort.js";
import { bubbleSort, bubbleSortCode } from "../algorithms/bubbleSort.js";
import {
  insertionSort,
  insertionSortCode,
} from "../algorithms/insertionSort.js";
import { quickSort, quickSortCode } from "../algorithms/quickSort.js";
import { mergeSort, mergeSortCode } from "../algorithms/mergeSort.js";
import { heapSort, heapSortCode } from "../algorithms/heapSort.js";
import { radixSort, radixSortCode } from "../algorithms/radixSort.js";
import "../App.css";

export default function MainPage() {
  const initialArr = [1, 69, 10, 82, 11, 25, 8, 14, 2, 51];

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
  const [selectedAlgo, setSelectedAlgo] = useState("selection");

  const algoCodes = {
    selection: selectionSortCode,
    bubble: bubbleSortCode,
    insertion: insertionSortCode,
    quick: quickSortCode,
    merge: mergeSortCode,
    heap: heapSortCode,
    radix: radixSortCode,
  };

  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;

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
  }, [isPlaying, speed, steps]);

  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      setBars(steps[currentStep]);
    }
  }, [currentStep, steps]);

  useEffect(() => {
    setSteps([]);
    setCurrentStep(0);
    setPlaying(false);
  }, [selectedAlgo]);

  const currentLine = steps[currentStep]?.line || 0;

  return (
    <div
      className="mainPage"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <NavMain selectedAlgo={selectedAlgo} setSelectedAlgo={setSelectedAlgo} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <BarsDisplay
          bars={bars}
          inputSize={inputSize}
          currenStep={currentStep}
          lastStep={steps.length - 1}
        />
        <CodeDisplay code={algoCodes[selectedAlgo]} currentLine={currentLine} />
      </div>
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
        selectedAlgo={selectedAlgo}
      />
    </div>
  );
}
