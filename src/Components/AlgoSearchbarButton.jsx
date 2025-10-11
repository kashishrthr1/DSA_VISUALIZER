export default function AlgoSearchbarButton() {
  return (
    <div className="w-full h-[54px] border border-black rounded-xl flex items-center px-3">
      {/* Search Icon */}
      <span className="material-symbols-outlined text-black text-[24px] mr-2">
        search
      </span>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent outline-none font-mono text-[18px] text-gray-500"
      />
    </div>
  );
}
