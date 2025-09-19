import { useState } from "react";
import "../App.css";
import generateArray from "../utils/generateArray.js";

export default function Controler({ bars, setBars, inputSize, setInputSize }) {
  return (
    <>
      <div className="playback-fixed">
        {/* absolute w-[800px] h-[84.33px] top-[470.67px] left-[303.6px] */}
        <div className="w-[800px] h-[84px] bg-[rgba(18,18,24,0.75)] rounded-[36px] flex items-center px-6 space-x-6">
          {/* --- Left Icons --- */}
          <div className="flex items-center space-x-4 text-white">
            {/* Play */}
            <button className="w-10 h-10 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            {/* Replay */}
            <button className="w-9 h-9 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 5V1L8 5l4 4V6c3.31 0 6 2.69 6 6a6 6 0 01-6 6c-2.22 0-4.15-1.21-5.19-3H4.26a8 8 0 0014.48 0A8 8 0 0012 5z" />
              </svg>
            </button>

            {/* Skip */}
            <button className="w-10 h-10 flex items-center justify-center">
              <svg
                width="28"
                height="28"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M6 18l8.5-6L6 6v12zm9-12h2v12h-2V6z" />
              </svg>
            </button>
          </div>

          {/* --- Speed & Slider --- */}
          <div className="flex items-center space-x-2 text-white flex-1">
            <span className="text-[20px] font-['IBM Plex Mono']">2x</span>
            <input
              type="range"
              min="1"
              max="5"
              defaultValue="2"
              className="w-[200px] accent-white"
            />
          </div>

          {/* --- Generate Button --- */}
          <button
            className="px-6 py-2 bg-[#121218] border-2 border-white text-white rounded-full font-['IBM_Plex_Mono']  text-[16px]"
            onClick={() => {
              let array = generateArray(inputSize);
              setBars(array);
            }}
          >
            Generate
          </button>

          {/* --- n = Input --- */}
          <div className="flex items-center space-x-2 text-white font-['IBM_Plex_Mono'] ">
            <span>n =</span>
            <input
              type="number"
              defaultValue={inputSize}
              className="w-[60px] h-[30px] text-center text-black rounded bg-white"
              onChange={(e) => {
                setInputSize(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
