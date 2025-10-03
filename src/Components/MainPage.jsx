import React, { useState, useEffect } from "react";
import Controler from "./Controler";
import NavMain from "./NavMain";
import BarsDisplay from "./BarsDisplay";
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
  const [steps, setSteps] = useState([]); // steps: array of {bars, comparing, swapping}
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1); // multiplier: 0.25, 0.5, 1, 2, ...
  const [selectedAlgo, setSelectedAlgo] = useState("selection");

  // autoplay effect
  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;

    const interval = Math.max(10, Math.round(1000 / speed)); // ms per step
    const id = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(id);
          setPlaying(false);
          return prev;
        }
      });
    }, interval);

    return () => clearInterval(id);
  }, [isPlaying, speed, steps]);

  // apply currentStep to bars (the BarsDisplay expects an object with bars/comparing/swapping)
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      setBars(steps[currentStep]);
    }
  }, [currentStep, steps]);

  // whenever algorithm changes, clear steps and stop playback (safe)
  useEffect(() => {
    setSteps([]);
    setCurrentStep(0);
    setPlaying(false);
  }, [selectedAlgo]);

  return (
    <div className="mainPage">
      <NavMain selectedAlgo={selectedAlgo} setSelectedAlgo={setSelectedAlgo} />
      <BarsDisplay bars={bars} inputSize={inputSize} />
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
