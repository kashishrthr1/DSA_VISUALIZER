import { useNavigate } from "react-router-dom";

export default function Card({ title, dark }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/main", { state: { selectedTitle: title } });
  };

  // 🔹 Sorting Algorithm Details
  const algoDetails = {
    "Bubble Sort": { difficulty: "Easy", complexity: "O(n²)" },
    "Selection Sort": { difficulty: "Easy", complexity: "O(n²)" },
    "Insertion Sort": { difficulty: "Easy", complexity: "O(n²)" },
    "Merge Sort": { difficulty: "Medium", complexity: "O(n log n)" },
    "Quick Sort": { difficulty: "Medium", complexity: "O(n log n)" },
    "Heap Sort": { difficulty: "Medium", complexity: "O(n log n)" },
    "Counting Sort": { difficulty: "Hard", complexity: "O(n + k)" },
    "Radix Sort": { difficulty: "Hard", complexity: "O(nk)" },
    "Bucket Sort": { difficulty: "Hard", complexity: "O(n + k)" },
  };

  const { difficulty, complexity } = algoDetails[title] || {
    difficulty: "Unknown",
    complexity: "O(?)",
  };

  return (
    <div
      className="w-64 h-[270px] border border-black rounded-2xl p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={handleClick}
    >
      {/* Video Preview */}
      <div
        className={`w-full h-[130px] border border-black rounded-2xl flex items-center justify-center ${
          dark ? "bg-black" : "bg-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={dark ? "white" : "black"}
          className="w-10 h-10"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-xl font-mono text-black mt-6 text-center">
        {title}
      </h2>

      {/* Tags / Buttons */}
      <div className="flex justify-between w-full mt-4">
        <span className="flex-1 mx-1 text-center px-2 py-1 text-xs font-mono border border-gray-400 rounded-xl text-gray-600 bg-gray-50">
          Sorting
        </span>
        <span className="flex-1 mx-1 text-center px-2 py-1 text-xs font-mono border border-gray-400 rounded-xl text-gray-600 bg-gray-50">
          {difficulty}
        </span>
        <span className="flex-1 mx-1 text-center px-2 py-1 text-xs font-mono border border-gray-400 rounded-xl text-gray-600 bg-gray-50">
          {complexity}
        </span>
      </div>
    </div>
  );
}
