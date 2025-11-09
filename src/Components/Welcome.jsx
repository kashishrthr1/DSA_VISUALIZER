import { useNavigate } from "react-router-dom";
export default function Welcome() {
  const handleScroll = () => {
    const section = document.getElementById("target-span");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/ExploreMore");
  };
  return (
    <section className="w-full max-w-[1193px] mx-[125.25px] m-[100px] font-['IBM_Plex_Mono'] text-left">
      {/* Title */}
      <h1 className="font-semibold text-[48px] leading-[62px] text-black">
        DSA Visualizer
      </h1>

      {/* Subtitle */}
      <p className="text-[27px] mt-4 text-black">Welcome to Code Motion</p>

      {/* Tagline */}
      <p className="text-[18px] mt-2 text-black">
        "See algorithms come alive with step-by-step visuals."
      </p>

      {/* Buttons */}
      <div className="flex gap-6 mt-10">
        <button
          onClick={handleClick}
          className="w-[161.25px] h-[61.5px] rounded-[18.75px] border border-black bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
        >
          Get Started
        </button>
        <button
          onClick={handleScroll}
          className="w-[161.25px] h-[61.5px] rounded-[18.75px] border border-black bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
        >
          Learn More
        </button>
      </div>
    </section>
  );
}
