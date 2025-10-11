
export default function ExploreNav() {
  return (
    <nav className="w-full bg-black px-4 py-3 flex items-center justify-between">
      {/* Left: Logo + Title */}
      <div className="flex items-center space-x-3 min-w-0">
        {/* Logo */}
        <div className="w-10 h-10 bg-gray-300 flex items-center justify-center flex-shrink-0 rounded">
          <span className="font-bold text-sm sm:text-base">Logo</span>
        </div>

        {/* Title */}
        <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-mono truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px]">
          DSA Visualizer
        </span>
      </div>

      {/* Right: Nav Links + Dark Mode */}
      <div className="flex items-center space-x-6 text-white font-mono text-sm md:text-base">
        <a href="/">Home</a>
        <a href="#" >Algorithms</a>
        <a href="#" >Comparison Mode</a>

        {/* Dark Mode Button */}
        <button className="text-white text-2xl sm:text-3xl flex-shrink-0">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>
      </div>
    </nav>
  );
}
