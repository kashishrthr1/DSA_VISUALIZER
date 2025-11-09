import { useNavigate } from "react-router-dom";

import logo from "../assets/logo2.svg";
export default function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <nav className="w-full bg-black px-4 py-3 flex items-center justify-between overflow-hidden">
      {/* Left: Logo + Title */}
      <a
        href="/"
        className="flex items-center space-x-3 min-w-0 cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-20 h-auto" />
        <span className="text-white text-base sm:text-lg md:text-xl lg:text-4xl ml-4 font-mono truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px]">
          Code Motion
        </span>
      </a>

      {/* Right: Explore More + Dark Mode */}
      <div className="flex items-center space-x-10">
        {/* Explore More */}
        <div className="text-white text-sm sm:text-base md:text-lg font-mono cursor-pointer hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 rounded">
          <a href="/ExploreMore">Explore More</a>
        </div>

        {/* Dark Mode Button */}
        <button className="text-white text-2xl sm:text-3xl flex-shrink-0">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>
      </div>
    </nav>
  );
}
