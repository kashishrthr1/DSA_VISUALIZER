import VideoCard from "./VideoCard";
export default function CardList() {
  const algorithms = ["Selection Sort", "Bubble Sort", "Insertion Sort"];
  return (
    <>
      <div className="flex justify-center gap-10 items-center w-full h-full px-6 py-4">
        {algorithms.map((algo) => (
          <VideoCard key={algo} title={algo} />
        ))}
      </div>
    </>
  );
}
