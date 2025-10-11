export default function CodeIcon() {
  return (
    <div className="flex items-start p-4 rounded-2xl w-full gap-6">
      {/* Icon */}
      <span className="flex-shrink-0 w-[90px] h-[90px]">
        <svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M49.5352 15.25H23.2852C21.296 15.25 19.3884 16.0402 17.9819 17.4467C16.5753 18.8532 15.7852 20.7609 15.7852 22.75V67.75C15.7852 69.7391 16.5753 71.6468 17.9819 73.0533C19.3884 74.4598 21.296 75.25 23.2852 75.25H49.5352M64.5352 15.25H68.2852C70.2743 15.25 72.1819 16.0402 73.5885 17.4467C74.995 18.8532 75.7852 20.7609 75.7852 22.75V26.5M75.7852 64V67.75C75.7852 69.7391 74.995 71.6468 73.5885 73.0533C72.1819 74.4598 70.2743 75.25 68.2852 75.25H64.5352M75.7852 41.5V49M45.7852 7.75V82.75" stroke="black" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </span>

      {/* Text Column */}
      <div className="flex flex-col justify-center">
        <span className="font-['IBM_Plex_Mono'] text-[24px] text-black">
          Compare & Explore
        </span>
        <span className="font-['IBM_Plex_Mono'] text-[18px] text-black mt-1">
          Test different algorithms side by side and understand their differences.
        </span>
      </div>
    </div>
  );
}
