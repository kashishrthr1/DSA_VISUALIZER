// import CardList from "./CardList";
// import ExploreMore from "./ExploreMore";
import CardList from "./CardList";
import ExploreMore from "./ExploreMore";

export default function Rectangle() {
  return (
    <section
      className="
        w-full max-w-[1100px]
        mx-4 sm:mx-auto
        mt-10
        border border-black
        rounded-[18.75px]
        flex flex-col gap-4
        p-4 sm:p-6
        overflow-x-hidden
      "
    >
      <CardList />
      <ExploreMore />
    </section>
  );
}
