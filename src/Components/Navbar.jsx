export default function Navbar(){
    return(
        <>
        <div className="absolute w-[1440px] h-[94.5px] rotate-0 opacity-100 bg-black">
            <div className="absolute w-[89.5px] h-[79.5px] top-[5.25px] left-[19.5px] opacity-100 bg-[rgba(217,217,217,1)] ">
                <div className="absolute w-[62px] h-[36px] top-[27px] left-[33px] opacity-100 ">
                        <span>
                            Logo
                        </span>
                </div>
            </div>
            <div className="absolute w-[282.75px] h-[31.5px] top-[31.5px] left-[125.25px] opacity-100">
                  <span className="font-['IBM_Plex_Mono'] font-normal  text-[30px]leading-[100%] tracking-[0] text-white">
                        DSA Visualizer
                    </span>
            </div>
           <div className="absolute top-[22.47px] left-[1200px] w-[45px] h-[45px] flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[48px]">
                    dark_mode
                </span>
            </div>

        </div>
        </>
    )
}