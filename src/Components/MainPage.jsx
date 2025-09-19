import Controler from "./Controler";
import NavMain from "./NavMain";

export default function MainPage(){
    return(
        <>
         <div className="h-[570px] w-[1280px]">
            <NavMain/>
            <Controler/>
         </div>
        </>
    )
}