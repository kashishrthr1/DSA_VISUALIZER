import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Assume these imports are correct and point to your video files
import selectionSortVid from "../assets/SelectionSort.mp4";
import bubbleSortVid from "../assets/BubbleSort.mp4";
import insertionSortVid from "../assets/InsertionSort.mp4";
import mergeSortVid from "../assets/MergeSort.mp4";
import quickSortVid from "../assets/QuickSort.mp4";
import heapSortVid from "../assets/HeapSort.mp4";
import radixSortVid from "../assets/RadixSort.mp4";

export default function Card({ title, dark }) {
  const navigate = useNavigate();
  // 1. Create a ref to access the video DOM element
  const videoRef = useRef(null);
  // 2. Create state to track the hover status
  const [isHovered, setIsHovered] = useState(false);

  // Map each algorithm to its hover video
  const videoMap = {
    "Selection Sort": selectionSortVid,
    "Bubble Sort": bubbleSortVid,
    "Insertion Sort": insertionSortVid,
    "Merge Sort": mergeSortVid,
    "Quick Sort": quickSortVid,
    "Heap Sort": heapSortVid,
    "Radix Sort": radixSortVid,
  };

  const hoverVideo = videoMap[title];

  const handleClick = () => {
    navigate("/main", { state: { selectedTitle: title } });
  };

  // 3. Play the video when the mouse enters the card
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // Catch promise rejection if playback is interrupted or pending
        console.error("Video playback failed:", error);
      });
    }
  };

  // 4. Pause and reset the video when the mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      // Reset video to the beginning for the next hover
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="w-full max-w-[270px] h-[270px] border border-black rounded-2xl p-4 flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
      // 5. Attach the event handlers to the main card container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Preview */}
      <div
        // Removed 'group' class since we use 'isHovered' state for visibility
        className={`w-full h-[180px] border border-black rounded-2xl flex items-center justify-center relative overflow-hidden ${
          dark ? "bg-black" : "bg-white"
        }`}
      >
        {/* Hover Video */}
        {hoverVideo && (
          <video
            // 6. Attach the ref to the video element
            ref={videoRef}
            src={hoverVideo}
            // Use state to control opacity
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            // We control playback via JS, so remove autoPlay
            loop
            muted
            preload="auto"
          />
        )}

        {/* Overlay to dim/hide the video before hover */}
        {hoverVideo && (
          <div
            // Use state to control opacity: full opacity when not hovered
            className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-500 z-10 pointer-events-none ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          ></div>
        )}

        {/* Play Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={dark ? "white" : "black"}
          // Use state to control opacity: hide when hovered
          className={`w-10 h-10 z-20 transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
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
