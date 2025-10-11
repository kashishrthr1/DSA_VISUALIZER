import React, { useState, useEffect, useRef } from "react";

export default function DropDown({ options, selected: selectedProp, onSelect, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeholder || "Select");
  const dropdownRef = useRef(null);

  // Sync with parent prop (handles reset like "Select Algorithm")
  useEffect(() => {
    setSelected(selectedProp || placeholder || "Select");
  }, [selectedProp, placeholder]);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown Header */}
      <div
        className="flex items-center justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-gray-700 min-w-[200px] max-w-[280px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="truncate text-white select-none">
          {selected}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
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
        <div className="absolute mt-2 min-w-[200px] max-w-[280px] bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
          {options.length > 0 ? (
            options.map((option, idx) => (
              <div
                key={option.id || idx}
                className="px-4 py-2 text-white text-sm hover:bg-gray-600 cursor-pointer truncate"
                onClick={() => {
                  const value = option.name || option;
                  setSelected(value);
                  onSelect(value);
                  setIsOpen(false);
                }}
              >
                {option.name || option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400 text-sm">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
