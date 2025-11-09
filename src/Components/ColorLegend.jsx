export default function ColorLegend() {
  const legendItems = [
    { color: "bg-[#ffb86b]", label: "Comparing" },
    { color: "bg-[#22C55E]", label: "Sorted" },
    { color: "bg-[#ff6b6b]", label: "Swapping" },
  ];

  return (
    <div className="w-full border border-black rounded-xl p-4 bg-white shadow-md">
      <h3 className="text-[16px] font-semibold mb-3 font-['IBM_Plex_Mono']">
        Color Legend
      </h3>
      <ul className="space-y-3">
        {legendItems.map((item) => (
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
    </div>
  );
}
