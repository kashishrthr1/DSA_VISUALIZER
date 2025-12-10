import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import { useState, useEffect } from "react";

// Constant algo types
const algoTypes = [
  {
    id: "sorting",
    name: "Sorting",
    algorithms: [
      "Bubble Sort",
      "Selection Sort",
      "Insertion Sort",
      "Merge Sort",
      "Quick Sort",
      "Heap Sort",
      "Radix Sort",
    ],
  },
  {
    id: "searching",
    name: "Searching",
    algorithms: ["Linear Search", "Binary Search", "Jump Search"],
  },
  {
    id: "tree",
    name: "Tree",
    algorithms: [
      "Binary Tree Traversal",
      "BST Insertion",
      "AVL Insertion",
      "Trie Insertion", // New
      "Segment Tree Build", // New
    ],
  },
];

export default function NavMain({
  selectedAlgorithm,
  onSelectAlgorithm,
  selectedType,
  onSelectType,
}) {
  const navigate = useNavigate();
  const handleClick = () => navigate("/ExploreMore");

  const [algorithms, setAlgorithms] = useState([]);

  // Update algorithm options when type changes
  useEffect(() => {
    const typeObj = algoTypes.find((t) => t.name === selectedType);
    if (typeObj) {
      setAlgorithms(typeObj.algorithms);
    } else {
      setAlgorithms([]);
    }

    // Reset algorithm only if the current selection is not in new type
    if (!typeObj || !typeObj.algorithms.includes(selectedAlgorithm)) {
      onSelectAlgorithm("Select Algorithm");
    }
  }, [selectedType, onSelectAlgorithm, selectedAlgorithm]);

  return (
    <nav className="w-full bg-[#121218] flex items-center px-4 sm:px-6 md:px-8 h-16 sm:h-20">
      {/* Left side - Logo */}
      <div className="text-white font-['IBM_Plex_Mono'] text-lg sm:text-xl md:text-2xl lg:text-[29px] border-r border-white pr-4 sm:pr-6 md:pr-8">
        Dsa Visualizer
      </div>

      {/* Middle menu */}
      <div className="hidden md:flex items-center space-x-4 sm:space-x-8 lg:space-x-[80px] ml-4 sm:ml-8 md:ml-12 text-white font-['IBM_Plex_Mono'] text-sm sm:text-lg md:text-xl lg:text-[23px]">
        {/* Algorithm Type Dropdown */}
        <DropDown
          options={algoTypes.map((t) => t.name)}
          selected={selectedType}
          onSelect={onSelectType}
          placeholder="Algorithm Type"
        />

        {/* Algorithm Dropdown */}
        <DropDown
          options={algorithms}
          selected={selectedAlgorithm}
          onSelect={onSelectAlgorithm}
          placeholder="Select Algorithm"
        />

        {/* Explore More */}
        <span onClick={handleClick} className="cursor-pointer">
          Explore More
        </span>
      </div>

      {/* Right side - Dark Mode Icon */}
      <div className="ml-auto cursor-pointer">
        <svg
          width="32"
          height="32"
          className="sm:w-8 sm:h-8 md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[44px]"
          viewBox="0 0 45 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.0667 38.5C17.4833 38.5 13.5875 36.8958 10.3792 33.6875C7.17082 30.4792 5.56665 26.5833 5.56665 22C5.56665 17.4167 7.17082 13.5208 10.3792 10.3125C13.5875 7.10417 17.4833 5.5 22.0667 5.5C22.4944 5.5 22.9149 5.51528 23.328 5.54583C23.7411 5.57639 24.1457 5.62222 24.5417 5.68333C23.2889 6.56944 22.2879 7.72322 21.5387 9.14467C20.7894 10.5661 20.4154 12.1012 20.4167 13.75C20.4167 16.5 21.3792 18.8375 23.3042 20.7625C25.2292 22.6875 27.5667 23.65 30.3167 23.65C31.9972 23.65 33.5403 23.2754 34.9458 22.5262C36.3514 21.7769 37.4972 20.7766 38.3833 19.525C38.4444 19.9222 38.4903 20.3268 38.5208 20.7387C38.5514 21.1506 38.5667 21.571 38.5667 22C38.5667 26.5833 36.9625 30.4792 33.7542 33.6875C30.5458 36.8958 26.65 38.5 22.0667 38.5Z"
            fill="white"
          />
        </svg>
      </div>
    </nav>
  );
}
