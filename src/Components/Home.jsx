import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Rectangle from "./Rectangle";
import WhyUs from "./WhyUs";
import ExploreFooter from "./ExploreFooter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Welcome />
        <Rectangle />
        <WhyUs />
      </div>
      <ExploreFooter />
    </div>
  );
}
