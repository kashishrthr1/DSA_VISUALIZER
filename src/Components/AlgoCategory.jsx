export default function AlgoCategory() {
  const categories = [
    "All",
    "Sorting",
    "Searching",
    "Tree",
    "Graph",
    "Dynamic Programming",
    "Other",
  ];

  const active = "Sorting"; // active category

  return (
    <div className="w-full border border-black rounded-xl p-4 flex flex-col gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`w-full py-3 rounded-xl border border-black font-mono text-lg text-center transition-colors ${
            cat === active
              ? "bg-black text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
