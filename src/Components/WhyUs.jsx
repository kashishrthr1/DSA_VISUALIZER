import CodeIcon from "./CodeIcon";
import Eye from "./Eye";
import Game from "./Game";
import CompareIcon from "./CompareIcon";

export default function WhyUs() {
  return (
    <div className="relative w-full flex justify-center mt-12 lg:mt-[50px] mb-12 lg:mb-[580px]">
      
      <div
        className="
          w-full max-w-[885.25px]
          px-4
          lg:px-0
          lg:absolute
          lg:h-[492px]
          lg:left-[122.25px]
          lg:top-0
        "
      >
        <span
          id="target-span"
          className="block mb-6 font-['IBM_Plex_Mono'] font-normal text-lg lg:text-[24px] leading-[100%] text-black"
        >
          Why use this DSA visualizer ?
        </span>

        {/* Icons */}
        <div className="flex flex-col lg:block gap-8">
          <Eye />
          <Game />
          <CodeIcon />
          <CompareIcon />
        </div>
      </div>
    </div>
  );
}
