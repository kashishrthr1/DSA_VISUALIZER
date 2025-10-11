import { useNavigate } from "react-router-dom";

export default function VideoCard({ title }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/main", { state: { selectedTitle: title } });
  };

  return (
    <div className="w-[348px] h-[290.25px] border-black border-[0.75px] rounded-[18.75px] flex flex-col justify-between overflow-hidden">
      {/* Video Section */}
      <div
        className="bg-black w-[283.5px] h-[172.5px] mx-auto mt-4 border-black border-[0.75px] rounded-[18.75px] flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <button className="w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[30px] border-l-white"></button>
      </div>

      {/* Bottom Section */}
      <div
        className="flex items-center justify-between px-4 py-3 border-t cursor-pointer"
        onClick={handleClick}
      >
        <span className="w-4 h-4 rounded-full border border-gray-500"></span>
        <span className="font-[IBM-PLEX-MONO] font-normal text-[24px] leading-[100%] tracking-[0] text-black">
          {title}
        </span>
        <span className="w-4 h-4 rounded-full border border-gray-500"></span>
      </div>
    </div>
  );
}
