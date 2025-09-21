import Controler from "./Controler";
import NavMain from "./NavMain";

export default function MainPage(){
    return(
        <>
         <div className="w-full min-h-screen">
            <NavMain/>
            <Controler/>
         </div>
        </>
    )
}