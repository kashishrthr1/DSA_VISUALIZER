import CodeIcon from "./CodeIcon";
import Eye from "./Eye";
import Game from "./Game";
import CompareIcon from "./CompareIcon";

export default function WhyUs() {
  return (
    <div className="relative mt-[50px] mb-[580px] w-full flex justify-center">
      <div className="absolute w-[885.25px] h-[492px] left-[122.25px] top-0">
        <span className="w-[486px] h-[33px] font-[IBM-PLEX-MONO] text-[27px]">
          Why use this DSA visualizer ?
        </span>
        <Eye />
        <Game />
        <CodeIcon />
        <CompareIcon />
      </div>
    </div>
  );
}
