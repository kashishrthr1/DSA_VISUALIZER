import { useState, useEffect } from "react";
import Controler from "./Controler";
import NavMain from "./NavMain";
import BarsDisplay from "./BarsDisplay";
import CodeDisplay from "./CodeDisplay";
import "../App.css";

export default function MainPage() {
  const [isPlaying, setPlaying] = useState(false);
  const [bars, setBars] = useState([1, 69, 10, 82, 11, 25, 8, 14, 2, 51]);
  const [inputSize, setInputSize] = useState(10);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1); // playback speed multiplier (0.25x → 16x)

  // autoplay effect
  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;

    const interval = 1000 / speed; // base 1x = 1000ms
    const id = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          setPlaying(false);
          clearInterval(id);
          return prev;
        }
      });
    }, interval);

    return () => clearInterval(id);
  }, [isPlaying, speed, steps]);

  // update bars with metadata
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      setBars(step);
    }
  }, [currentStep, steps]);

  return (
    <div className="mainPage">
      <NavMain />
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
      />
      <CodeDisplay
        code={`function selectionSort(arr) { 
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      for (let j = i+1; j < arr.length; j++) {
        if (arr[j] < arr[min]) min = j;
      }
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
    return arr;
  }`}
        language="javascript"
      />
    </div>
  );
}
