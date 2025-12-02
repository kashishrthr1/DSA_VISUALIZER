import React from "react";

// FIX: This component is now self-contained, avoiding the external
// 'react-syntax-highlighter' dependency by implementing custom logic.

export default function CodeDisplay({ code, currentLine }) {
  // Split code into lines for display and line number rendering
  const lines = code.split("\n");

  return (
    <div
      className="bg-[#1e1e1e] rounded-xl shadow-2xl p-4 mt-8 h-full overflow-y-auto w-full"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        color: "white",
        minHeight: "300px",
      }}
    >
      <h3 className="text-lg font-semibold mb-2 text-[#64FFDA]">
        Algorithm Code
      </h3>
      <pre className="p-0 m-0 text-sm overflow-x-auto">
        {" "}
        {/* FIX: Corrected typo 'overflowyo-x-auto' to 'overflow-x-auto' */}
        <code className="block">
          {lines.map((lineContent, index) => {
            // Line numbers start from 1, so index + 1
            const lineNumber = index + 1;
            const isHighlighted = lineNumber === currentLine;

            return (
              <div
                key={lineNumber}
                className={`flex transition-all duration-300 ease-in ${
                  isHighlighted ? "bg-[#64FFDA]" : "hover:bg-gray-800"
                } rounded-sm`} // Added subtle hover effect for polish
              >
                {/* Alignment Fix: 
                                    1. Increased width (w-12) for better spacing.
                                    2. Added right border (border-r) for a clear visual separation line.
                                */}
                <span
                  className={`${
                    isHighlighted ? "text-gray-800" : "text-gray-500"
                  } w-12 text-right pr-3 select-none flex-shrink-0 border-r border-gray-700`}
                >
                  {lineNumber}
                </span>

                {/* Code Content Fix:
                                    1. Added left padding (pl-3) to separate code from the border.
                                */}
                <span
                  className={`${
                    isHighlighted ? "text-black" : "text-white"
                  } whitespace-pre flex-grow pl-3`}
                >
                  {lineContent}
                </span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
