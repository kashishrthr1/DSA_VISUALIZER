import { useNavigate } from "react-router-dom";

export default function VideoCard({ title }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/main", { state: { selectedTitle: title } });
  };

  return (
    <div className="w-[348px] border-black border-[0.75px] rounded-[18.75px] flex flex-col justify-between overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {/* Video Section */}
      <div
        className="group bg-black w-[283.5px] h-[172.5px] mx-auto mt-4 border-black border-[0.75px] rounded-[18.75px] flex items-center justify-center cursor-pointer relative"
        onClick={handleClick}
      >
        {/* Play button — visible only when NOT hovering */}
        <button className="w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[30px] border-l-white opacity-100 group-hover:opacity-0 transition-opacity duration-300"></button>

        {/* Optional: Add something on hover (like video, image, or text) */}
        {/* <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundImage: "url('/your-hover-image.png')" }}></div> */}
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
