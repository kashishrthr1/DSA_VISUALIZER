import React from 'react';

// Helper function to get the Tailwind class for an element's background color
const getElementColor = (index, searchState) => {
    const { foundIndex, checkingIndex, notFoundIndices } = searchState;

    if (foundIndex === index) return 'bg-green-500 text-white'; // Found
    if (checkingIndex === index) return 'bg-orange-300 text-gray-800'; // Checking
    // Check if the element is out of the current search bounds
    if (notFoundIndices.includes(index)) return 'bg-red-200 text-gray-400';

    return 'bg-white text-gray-800'; // Default/In current bounds
};

// Helper function to get the pointer label (Start, End, Mid) for an index
const getPointer = (index, searchState) => {
    const { startPointer, endPointer, midPointer } = searchState;
    const pointers = [];

    if (startPointer === index) pointers.push({ label: 'Start', color: 'text-orange-500' });
    if (endPointer === index) pointers.push({ label: 'End', color: 'text-yellow-500' });
    if (midPointer === index) pointers.push({ label: 'Mid', color: 'text-blue-500' });

    return pointers;
};

export default function ArrayDisplay({ searchState, currentStep, lastStep }) {
    const { array, foundIndex, checkingIndex, findingValue } = searchState;

    // Determine Status Message
    let statusMessage = `Searching for value: ${findingValue}`;
    let statusColor = 'text-gray-600';

    if (foundIndex !== -1) {
        statusMessage = `Success! Found ${findingValue} at index ${foundIndex}.`;
        statusColor = 'text-green-600 font-bold';
    } else if (currentStep === lastStep && checkingIndex === -1) {
        statusMessage = `Search Complete. Value ${findingValue} was not found.`;
        statusColor = 'text-red-600 font-bold';
    } else if (checkingIndex !== -1) {
        statusMessage = `Checking value at index ${checkingIndex}...`;
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 shadow-inner">
            <h3 className="text-xl mb-6 font-['IBM_Plex_Mono'] font-bold">Binary Search Visualization</h3>
            
            {/* Display the Array Elements */}
            <div className="flex space-x-2 items-start mb-8">
                {array.map((value, index) => {
                    const colorClass = getElementColor(index, searchState);
                    const pointers = getPointer(index, searchState);
                    
                    return (
                        <div key={index} className="flex flex-col items-center min-w-[70px]">
                            {/* Index */}
                            <div className="text-xs text-gray-500 mb-1">{index}</div>

                            {/* Pointer Indicator (Above the element) */}
                            <div className="h-10 flex flex-col justify-end items-center">
                                {pointers.map(p => (
                                    <div key={p.label} className={`text-sm font-semibold ${p.color} bg-gray-100 px-2 py-0.5 rounded-full mb-1 border border-gray-300`}>
                                        {p.label}
                                    </div>
                                ))}
                            </div>

                            {/* Array Element Block */}
                            <div
                                className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg border-2 border-black shadow-lg transition-all duration-300 font-['IBM_Plex_Mono'] ${colorClass}`}
                            >
                                <span className="text-2xl font-bold">{value}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Status */}
            <div className={`mt-4 text-xl font-mono ${statusColor}`}>
                {statusMessage}
            </div>
        </div>
    );
}