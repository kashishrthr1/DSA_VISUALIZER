import React from "react";
import "../App.css";

function BarsDisplay({ bars, inputSize, currenStep, lastStep }) {
  // Normalize bars prop: accept either array OR {bars, comparing, swapping}
  let arr = [];
  let comparing = [];
  let swapping = [];

  if (Array.isArray(bars)) {
    arr = bars;
  } else if (bars && Array.isArray(bars.bars)) {
    arr = bars.bars;
    comparing = bars.comparing || [];
    swapping = bars.swapping || [];
  } else {
    arr = [];
  }

  const width = Math.max(24, Math.floor(700 / Math.max(1, inputSize)));

  return (
    <div
      style={{
        display: "flex",
        gap: "6px",
        alignItems: "flex-end",
        margin: "25px",
        borderRadius: "12px",
        padding: "20px",
        height: "320px",
        overflowX: "auto",
      }}
    >
      {arr.map((value, index) => {
        let color = "white";
        if (currenStep === lastStep) color = "#22C55E";
        else if (swapping.includes(index))
          color = "#ff6b6b"; // red for swapping
        else if (comparing.includes(index)) color = "#ffb86b"; // orange for comparing

        return (
          <div
            key={index}
            title={String(value)}
            style={{
              backgroundColor: color,
              height: `${value * 3}px`,
              width: `${width}px`,
              borderRadius: "4px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              color: "#000",
              fontSize: "12px",
              paddingBottom: "6px",
              boxSizing: "border-box",
              border: "2px solid black",
            }}
          >
            <b>{value}</b>
          </div>
        );
      })}
    </div>
  );
}

export default BarsDisplay;
