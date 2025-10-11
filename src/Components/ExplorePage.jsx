import ExploreFooter from "./ExploreFooter";
import ExploreNav from "./ExploreNav";
import ExploreTv from "./ExploreTv";
import ExploreAll from "./ExploreAll"; // ✅ you missed this import

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top content */}
      <ExploreNav />
      <ExploreAll />
      <ExploreTv />

      {/* Footer always at bottom */}
      <div className="mt-auto">
        <ExploreFooter />
      </div>
    </div>
  );
}
