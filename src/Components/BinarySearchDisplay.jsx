// BinarySearchDisplay.jsx
import React from "react";

// Color Mappings from ColorLegend:
// Start Pointer: #ffb86b (Comparing)
// End Pointer: #FFF56B
// Mid Pointer: #6B8EFF
// Found: #22C55E (Found)
// Not Found: #FF6B6B

// NOTE: Step structure uses: comparing for Mid, swapping for [Low, High], found for Found Index

export default function BinarySearchDisplay({ bars }) {
  const arr = bars.bars || [];
  const [lowIndex, highIndex] = bars.swapping || []; // Low/High Pointers
  const midIndex = bars.comparing[0]; // Mid Pointer
  const found = bars.found || [];
  const isFinished = arr.length > 0 && found.length > 0;
  const isNotFound =
    arr.length > 0 && bars.comparing.length === 0 && found.length === 0;

  const targetValue = 11; // (Placeholder)

  return (
    <div className="flex flex-col items-center justify-center h-[350px] p-4 bg-gray-50 rounded-xl shadow-inner">
      <div className="flex gap-2 mb-4">
        <span className="text-lg font-bold font-['IBM_Plex_Mono']">
          Target:
        </span>
        <span className="text-lg font-bold text-blue-600 font-['IBM_Plex_Mono']">
          {targetValue}
        </span>
      </div>

      <div className="flex gap-2 relative">
        {arr.map((value, index) => {
          let color = "bg-white";
          let label = null;

          if (found.includes(index)) {
            color = "bg-[#22C55E] ring-4 ring-green-600 text-white"; // Found
          } else if (midIndex === index) {
            color = "bg-[#6B8EFF] ring-2 ring-blue-500 text-white"; // Mid Pointer
            label = "MID";
          } else if (lowIndex === index) {
            color = "bg-[#ffb86b] ring-2 ring-yellow-400"; // Start Pointer
            label = "LOW";
          } else if (highIndex === index) {
            color = "bg-[#FFF56B] ring-2 ring-yellow-600"; // End Pointer
            label = "HIGH";
          } else if (isNotFound) {
            color = "bg-[#FF6B6B] text-white"; // Not Found (final step)
          }

          return (
            <div
              key={index}
              className={`w-12 h-12 flex flex-col items-center justify-center border border-gray-400 rounded-lg transition-all duration-300 transform scale-100 text-[14px] font-['IBM_Plex_Mono'] ${color}`}
              style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
            >
              {/* Pointer Label */}
              {label && (
                <span className="absolute -top-6 text-xs font-semibold text-gray-700">
                  {label}
                </span>
              )}
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
