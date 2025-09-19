
// import CardList from "./CardList";
// import ExploreMore from "./ExploreMore";

import CardList from "./CardList";
import ExploreMore from "./ExploreMore";

export default function Rectangle(){
    return(
        <>
        <div className="absolute w-[1100px] h-[372.75px] top-[525.75px] left-[75.5px]  border-black border-[0.75px] rounded-[18.75px]  flex flex-col">
             <CardList/>
            <ExploreMore/>
        </div>
        
        </>
    )
}