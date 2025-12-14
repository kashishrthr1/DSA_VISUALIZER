import VideoCard from "./VideoCard";

export default function CardList() {
  const algorithms = ["Selection Sort", "Bubble Sort", "Insertion Sort"];

  return (
    <div
      className="
        flex justify-center items-center
        gap-10
        w-full
        px-6 py-4
        lg:flex-nowrap flex-wrap
      "
    >
      {algorithms.map((algo) => (
        <VideoCard key={algo} title={algo} />
      ))}
    </div>
  );
}
