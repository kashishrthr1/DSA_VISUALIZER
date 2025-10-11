
// import CardList from "./CardList";
// import ExploreMore from "./ExploreMore";
import CardList from "./CardList";
import ExploreMore from "./ExploreMore";

export default function Rectangle() {
  return (
    <section className="w-full max-w-[1100px] mx-auto mt-10 border border-black border-[0.75px] rounded-[18.75px] flex flex-col gap-4 p-6">
      <CardList />
      <ExploreMore />
    </section>
  );
}
