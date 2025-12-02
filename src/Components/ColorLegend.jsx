export default function ColorLegend({ selectedAlgorithm, selectedType }) {
  const sortItems = [
    { color: "bg-[#ffb86b]", label: "Comparing" },
    { color: "bg-[#22C55E]", label: "Sorted" },
    { color: "bg-[#ff6b6b]", label: "Swapping" },
  ];

  const linearItems = [
    { color: "bg-[#ffb86b]", label: "Checking" },
    { color: "bg-[#22C55E]", label: "Found" },
    { color: "bg-[#ff6b6b]", label: "Not Found" },
  ];

  const binaryItems = [
    { color: "bg-[#ffb86b]", label: "Start Pointer" },
    { color: "bg-[#FFF56B]", label: "End Pointer" },
    { color: "bg-[#6B8EFF]", label: "Mid Pointer" },
    { color: "bg-[#22C55E]", label: "Found" },
    { color: "bg-[#FF6B6B]", label: "Not Found" },
  ];

  return (
    <div className="w-full border border-black rounded-xl p-4 bg-white shadow-md">
      <h3 className="text-[16px] font-semibold mb-3 font-['IBM_Plex_Mono']">
        Color Legend
      </h3>
      {selectedType === "Sorting" && (
        <ul className="space-y-3">
          {sortItems.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-sm border border-black ${item.color}`}
              ></span>
              <span className="text-[14px] font-['IBM_Plex_Mono'] text-black">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      {selectedType === "Searching" &&
        selectedAlgorithm === "Linear Search" && (
          <ul className="space-y-3">
            {linearItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-sm border border-black ${item.color}`}
                ></span>
                <span className="text-[14px] font-['IBM_Plex_Mono'] text-black">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        )}

      {selectedType === "Searching" &&
        selectedAlgorithm === "Binary Search" && (
          <ul className="space-y-3">
            {binaryItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-sm border border-black ${item.color}`}
                ></span>
                <span className="text-[14px] font-['IBM_Plex_Mono'] text-black">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
