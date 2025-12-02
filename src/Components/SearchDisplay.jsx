import React from "react";
import LinearSearch from "./LinearSearchDisplay";
import BinarySearch from "./BinarySearchDisplay";

// Assuming you'll pass 'bars' and other props down, even if not used here
function SearchDisplay({ bars, selectedAlgorithm }) {
  // IMPORTANT: Wrap the returned JSX in parentheses (or put the JSX immediately after return)
  return (
    <>
      {/* Remove semicolons and use self-closing tags */}
      {selectedAlgorithm === "Linear Search" && <LinearSearch bars={bars} />}
      {selectedAlgorithm === "Binary Search" && <BinarySearch bars={bars} />}
    </>
  );
}

export default SearchDisplay;
