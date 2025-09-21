export default function Navbar() {
  return (
    <nav className="w-full bg-black px-4 py-3 flex items-center justify-between overflow-hidden">
      {/* Left: Logo + Title */}
      <div className="flex items-center space-x-3 min-w-0">
        {/* Logo */}
        <div className="w-10 h-10 bg-gray-300 flex items-center justify-center flex-shrink-0">
          <span className="font-bold text-sm sm:text-base">Logo</span>
        </div>

        {/* Title */}
        <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-mono truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px]">
          DSA Visualizer
        </span>
      </div>

      {/* Right: Dark Mode Button */}
      <button className="text-white text-2xl sm:text-3xl flex-shrink-0">
        <span className="material-symbols-outlined">dark_mode</span>
      </button>
    </nav>
  );
}
