import Navbar from "./Navbar"
import Welcome from "./Welcome"
import Rectangle from "./Rectangle"
import WhyUs from "./WhyUs"
export default function Home(){
    return(
        <>
        <div className='w-[1440px] h-[2047.5px]'>
     <Navbar/>
     <Welcome/>
     <Rectangle/>
     <WhyUs/>
     </div>
        </>
    )
}