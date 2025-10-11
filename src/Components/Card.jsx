import { useNavigate } from "react-router-dom";
export default function Card({ title, dark }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/main",{ state: { selectedTitle: title } }); // redirects from '/' to '/main'
  };
  return (
    <div className="w-64 h-[270px] border border-black rounded-2xl p-4 flex flex-col items-center" onClick={handleClick}>
      {/* Video Preview */}
      <div
        className={`w-full h-[130px] border border-black rounded-2xl flex items-center justify-center ${
          dark ? "bg-black" : "bg-white"
        }`}
      >
        {/* Play Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={dark ? "white" : "black"}
          className="w-10 h-10"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-xl font-mono text-black mt-6">{title}</h2>

      {/* Tags */}
      <div className="flex gap-2 mt-4">
        <span className="px-3 py-1 text-xs font-mono border border-gray-400 rounded-2xl text-gray-500">
          Sorting
        </span>
        <span className="px-3 py-1 text-xs font-mono border border-gray-400 rounded-2xl text-gray-500">
          Easy
        </span>
        <span className="px-3 py-1 text-xs font-mono border border-gray-400 rounded-2xl text-gray-500">
          O(n²)
        </span>
      </div>
    </div>
  );
}
