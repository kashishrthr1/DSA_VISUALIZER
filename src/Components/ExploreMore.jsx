import { useNavigate } from "react-router-dom";
export default function ExploreMore() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/ExploreMore");
  };
  return (
    <>
      <div
        className="font-['IBM_Plex_Mono'] text-[24px] leading-[100%] tracking-[0] text-black w-full border border-black text-center py-3 cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 rounded-[18.75px]"
        onClick={handleClick}
      >
        Explore More
      </div>
    </>
  );
}
