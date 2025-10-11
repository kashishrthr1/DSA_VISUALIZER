import AlgoCategory from "./AlgoCategory";
import AlgoSearchbarButton from "./AlgoSearchbarButton";
import Sorting from "./Sorting";

export default function ExploreTv() {
  return (
    <section className="w-full flex gap-6 px-8 mt-12">
      {/* Left Sidebar */}
      <div className="w-[250px] flex flex-col gap-6">
        <AlgoSearchbarButton />
        <AlgoCategory />
      </div>

      {/* Right Content */}
      <div className="flex-1">
        <Sorting />
      </div>
    </section>
  );
}

