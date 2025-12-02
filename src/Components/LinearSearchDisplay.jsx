// LinearSearchDisplay.jsx
import React from "react";

// Color Mappings from ColorLegend:
// Checking: #ffb86b (Comparing)
// Found: #22C55E (Found)
// Not Found: #ff6b6b (Swapping/Default)
// NOTE: We'll use comparing for 'Checking' and found for 'Found'.

export default function LinearSearchDisplay({ bars }) {
  const arr = bars.bars || [];
  const checking = bars.comparing || []; // Checking = comparing
  const found = bars.found || [];
  const isFinished =
    arr.length > 0 && checking.length === 0 && found.length > 0;
  const isNotFound =
    arr.length > 0 && checking.length === 0 && found.length === 0;

  const targetValue = 11; // (Ideally passed from MainPage/Controler, but hardcoded here as a placeholder for visual effect)

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

      <div className="flex gap-2">
        {arr.map((value, index) => {
          let color = "bg-white"; // Default/Unchecked
          let textColor = "text-black";

          if (checking.includes(index)) {
            color = "bg-[#ffb86b] ring-2 ring-black"; // Checking
          } else if (found.includes(index)) {
            color = "bg-[#22C55E] ring-4 ring-green-600"; // Found
            textColor = "text-white";
          } else if (isNotFound && !found.includes(index)) {
            color = "bg-[#ff6b6b]"; // Not Found (final step)
            textColor = "text-white";
          }

          return (
            <div
              key={index}
              className={`w-12 h-12 flex flex-col items-center justify-center border border-gray-400 rounded-lg transition-all duration-300 transform scale-100 ${color} ${textColor} text-[14px] font-['IBM_Plex_Mono']`}
              style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
