import { useNavigate } from "react-router-dom";
export default function ExploreMore() {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate("/ExploreMore");
  }
  return (
    <>
    <div className="font-[IBM-PLEX-MONO] font-normal text-[24px] leading-[100%] tracking-[0] text-black w-full border-t border-gray-300 text-center py-3 cursor-pointer hover:bg-gray-100 rounded-[18.75px]" onClick={handleClick}>
      Explore More
    </div>
    </>
  );
}