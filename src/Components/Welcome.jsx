

export default function Welcome() {
  return (
    <section className="w-full max-w-[1193px] mx-[125.25px] mt-[100px] font-['IBM_Plex_Mono'] text-left">
      {/* Title */}
      <h1 className="font-semibold text-[48px] leading-[62px] text-black">
        DSA Visualizer
      </h1>

      {/* Subtitle */}
      <p className="text-[27px] mt-4 text-black">
        Welcome to DSA Visualizer
      </p>

      {/* Tagline */}
      <p className="text-[18px] mt-2 text-black">
        "See algorithms come alive with step-by-step visuals."
      </p>

      {/* Buttons */}
      <div className="flex gap-6 mt-10">
        <button className="w-[161.25px] h-[61.5px] rounded-[18.75px] border border-black bg-white flex items-center justify-center hover:bg-gray-100 transition">
          Get Started
        </button>
        <button className="w-[161.25px] h-[61.5px] rounded-[18.75px] border border-black bg-white flex items-center justify-center hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}
