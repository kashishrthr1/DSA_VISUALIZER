import Navbar from "./Navbar"
import Welcome from "./Welcome"
import Rectangle from "./Rectangle"
import WhyUs from "./WhyUs"
export default function Home(){
    return(
        <>
        <div className='w-full min-h-screen'>
     <Navbar/>
     <Welcome/>
     <Rectangle/>
     <WhyUs/>
     </div>
        </>
    )
}