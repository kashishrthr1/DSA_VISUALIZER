export default function NavMain() {
  return (
    <nav className="w-full h-[92px] bg-[#121218] flex items-center px-8">
      {/* Left side - Logo */}
      <div className="text-white font-['IBM_Plex_Mono'] text-[29px] border-r border-white pr-8">
        Dsa Visualizer
      </div>

      {/* Middle menu */}
      <div className="flex items-center space-x-12 ml-12 text-white font-['IBM_Plex_Mono'] text-[23px]">
        {/* Sorting */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <span>Sorting</span>
          {/* Dropdown Arrow */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 16L5 9" stroke="white" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Select Algorithm */}
        <div className="flex items-center space-x-2 cursor-pointer font-['IBM_Plex_Mono'] text-[23px]">
          <span>Select Algorithm</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 16L5 9" stroke="white" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Comparison Mode */}
        <span>Comparison Mode</span>
      </div>

      {/* Right side - Dark Mode */}
      <div className="ml-auto cursor-pointer">
        {/* Moon Icon (your SVG) */}
        <svg
          width="45"
          height="44"
          viewBox="0 0 45 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.0667 38.5C17.4833 38.5 13.5875 36.8958 10.3792 33.6875C7.17082 30.4792 5.56665 26.5833 5.56665 22C5.56665 17.4167 7.17082 13.5208 10.3792 10.3125C13.5875 7.10417 17.4833 5.5 22.0667 5.5C22.4944 5.5 22.9149 5.51528 23.328 5.54583C23.7411 5.57639 24.1457 5.62222 24.5417 5.68333C23.2889 6.56944 22.2879 7.72322 21.5387 9.14467C20.7894 10.5661 20.4154 12.1012 20.4167 13.75C20.4167 16.5 21.3792 18.8375 23.3042 20.7625C25.2292 22.6875 27.5667 23.65 30.3167 23.65C31.9972 23.65 33.5403 23.2754 34.9458 22.5262C36.3514 21.7769 37.4972 20.7766 38.3833 19.525C38.4444 19.9222 38.4903 20.3268 38.5208 20.7387C38.5514 21.1506 38.5667 21.571 38.5667 22C38.5667 26.5833 36.9625 30.4792 33.7542 33.6875C30.5458 36.8958 26.65 38.5 22.0667 38.5ZM22.0667 34.8333C24.7555 34.8333 27.1694 34.0921 29.3083 32.6095C31.4472 31.1269 33.0055 29.1946 33.9833 26.8125C33.3722 26.9653 32.7611 27.0875 32.15 27.1792C31.5389 27.2708 30.9278 27.3167 30.3167 27.3167C26.5583 27.3167 23.3573 25.9948 20.7137 23.3512C18.07 20.7075 16.7488 17.5071 16.75 13.75C16.75 13.1389 16.7958 12.5278 16.8875 11.9167C16.9792 11.3056 17.1014 10.6944 17.2542 10.0833C14.8708 11.0611 12.9379 12.6194 11.4553 14.7583C9.97276 16.8972 9.2321 19.3111 9.23332 22C9.23332 25.5444 10.4861 28.5694 12.9917 31.075C15.4972 33.5806 18.5222 34.8333 22.0667 34.8333Z"
            fill="white"
          />
        </svg>
      </div>
    </nav>
  );
}
