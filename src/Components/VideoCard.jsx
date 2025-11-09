import { useNavigate } from "react-router-dom";
import selectionsortvid from "../assets/SelectionSort.mp4";
import bubblesortvid from "../assets/BubbleSort.mp4";
import insertionsortvid from "../assets/InsertionSort.mp4";

export default function VideoCard({ title }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/main", { state: { selectedTitle: title } });
  };

  // Select video based on algorithm title
  const getVideoSrc = () => {
    switch (title) {
      case "Selection Sort":
        return selectionsortvid;
      case "Bubble Sort":
        return bubblesortvid;
      case "Insertion Sort":
        return insertionsortvid;
      default:
        return null;
    }
  };

  const videoSrc = getVideoSrc();

  return (
    <div className="w-[348px] border-black border-[0.75px] rounded-[18.75px] flex flex-col justify-between overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {/* Video Section */}
      <div
        className="group bg-black w-[283.5px] h-[172.5px] mx-auto mt-4 border-black border-[0.75px] rounded-[18.75px] flex items-center justify-center cursor-pointer relative overflow-hidden"
        onClick={handleClick}
      >
        {/* Play Button — visible when not hovering */}
        <button className="w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[30px] border-l-white opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-20"></button>

        {/* Hover Video — only if video source exists */}
        {videoSrc && (
          <>
            <video
              src={videoSrc}
              className="absolute inset-0 w-full h-full object-fill opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              autoPlay
              loop
              muted
            />

            {/* Grey Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          </>
        )}
      </div>

      {/* Bottom Section */}
      <div
        className="flex items-center justify-between px-4 py-3 border-t cursor-pointer mt-4"
        onClick={handleClick}
      >
        <span className="w-4 h-4 rounded-full border bg-gray-500"></span>
        <span className="font-['IBM_Plex_Mono'] font-normal text-[18px] leading-[100%] tracking-[0] text-black">
          {title}
        </span>
        <span className="w-4 h-4 rounded-full border bg-gray-500"></span>
      </div>
    </div>
  );
}
