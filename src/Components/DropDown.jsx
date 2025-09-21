import React, { useState } from "react";

export default function DropDown({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
   const [selected, setSelected] = useState("Sorting");

  const algorithms = [
    { id: "bubble", name: "Bubble Sort" },
    { id: "selection", name: "Selection Sort" },
    { id: "insertion", name: "Insertion Sort" },
    { id: "merge", name: "Merge Sort" },
    { id: "quick", name: "Quick Sort" },
  ];

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Header */}
      <div
        className="flex items-center justify-between space-x-2 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-700 w-62"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selected}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            d="M19 9L12 16L5 9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
          {algorithms.map((algo) => (
            <div
              key={algo.id}
              className="px-4 py-2 text-white text-sm hover:bg-gray-600 cursor-pointer"
              onClick={() => {
                setSelected(algo.name);
                onSelect(algo.id); // trigger selection function
                setIsOpen(false); // close dropdown
              }}
            >
              {algo.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
