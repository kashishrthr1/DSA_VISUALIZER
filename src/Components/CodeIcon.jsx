export default function CodeIcon() {
  return (
    <div className="flex items-start p-4 rounded-2xl w-full gap-6">
      {/* Icon */}
      <span className="flex-shrink-0 w-[90px] h-[90px]">
        <svg
          width="91"
          height="91"
          viewBox="0 0 91 91"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.5352 67.75L8.03516 45.25L30.5352 22.75L35.8789 28.0938L18.6289 45.3437L35.7852 62.5L30.5352 67.75ZM60.5352 67.75L55.1914 62.4063L72.4414 45.1563L55.2852 28L60.5352 22.75L83.0352 45.25L60.5352 67.75Z"
            fill="black"
          />
        </svg>
      </span>

      {/* Text Column */}
      <div className="flex flex-col justify-center">
        <span className="font-['IBM_Plex_Mono'] text-[24px] text-black">
          Code + Complexity at a Glance
        </span>
        <span className="font-['IBM_Plex_Mono'] text-[18px] text-black mt-1">
          See pseudocode, time complexity, and space usage alongside visuals.
        </span>
      </div>
    </div>
  );
}
