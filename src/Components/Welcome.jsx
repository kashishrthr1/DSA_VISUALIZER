

export default function Welcome(){
    return (
        <>
    <div className="absolute w-[1193px] h-[354.75px] top-[5.5px] left-[125.25px]">
      <div className="absolute w-[486px] h-[168.75px] top-[170px] left-[125.25px]">
        
        {/* Title */}
        <h1 className="font-['IBM_Plex_Mono'] font-semibold text-[48px] leading-[100%] text-black">
          DSA Visualizer
        </h1>

        {/* Subtitle */}
        <p className="absolute w-[431.25px] h-[33px] top-[70.25px] font-['IBM_Plex_Mono'] text-[27px] text-black">
          Welcome to DSA Visualizer
        </p>

        {/* Tagline */}
        <p className="absolute w-[486px] h-[48px] top-[110.25px] font-['IBM_Plex_Mono'] text-[18px] text-black">
          "See algorithms come alive with step-by-step visuals."
        </p>

        {/* Buttons */}
        <div className="flex gap-6 mt-[160px]">
          <button className="w-[161.25px] h-[61.5px] rounded-[18.75px] border border-black bg-white flex items-center justify-center">
            <span className="font-['IBM_Plex_Mono']  text-[18px]">Get Started</span>
          </button>
          <button className="w-[161.25px] h-[61.5px] rounded-[18.75px] border border-black bg-white flex items-center justify-center">
            <span className="font-['IBM_Plex_Mono']  text-[18px]">Learn More</span>
          </button>
        </div>

      </div>
      
      
    </div>
  

        </>
    )
}