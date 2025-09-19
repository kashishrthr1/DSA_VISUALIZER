export default function Game() {
  return (
    <div className="flex items-start space-x-4 rounded-2xl w-full p-4 ">
      
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
            d="M30.8032 31.7127V46.7127M23.3032 39.2127H38.3032M60.402 14.8264H30.1732C24.9822 14.8274 20.0042 16.8902 16.334 20.5611C12.6638 24.232 10.602 29.2105 10.602 34.4014V65.3952C10.602 73.1764 20.1007 76.9639 25.4595 71.3239L36.6195 59.5714H53.9595L64.7407 72.5464C69.8932 78.7489 79.977 75.1039 79.977 67.0452V34.3977C79.976 29.2074 77.9137 24.2299 74.2436 20.5598C70.5735 16.8897 65.5923 14.8274 60.402 14.8264Z"
            stroke="black"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55.2682 39.2124C57.3393 39.2124 59.0182 37.5335 59.0182 35.4624C59.0182 33.3913 57.3393 31.7124 55.2682 31.7124C53.1971 31.7124 51.5182 33.3913 51.5182 35.4624C51.5182 37.5335 53.1971 39.2124 55.2682 39.2124Z"
            fill="black"
          />
          <path
            d="M63.5182 47.4626C65.5893 47.4626 67.2682 45.7837 67.2682 43.7126C67.2682 41.6416 65.5893 39.9626 63.5182 39.9626C61.4471 39.9626 59.7682 41.6416 59.7682 43.7126C59.7682 45.7837 61.4471 47.4626 63.5182 47.4626Z"
            fill="black"
          />
        </svg>
      </span>

      {/* Text Column */}
      <div className="flex flex-col">
        <span className="font-['IBM_Plex_Mono'] text-[24px] leading-tight text-black">
          Interactive Learning
        </span>
        <span className="font-['IBM_Plex_Mono'] text-[18px] text-black-700 mt-1">
          Generate datasets, choose inputs, and explore algorithms your way.
        </span>
      </div>

    </div>
  );
}
