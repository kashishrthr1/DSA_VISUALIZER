import "../App.css";

function BarsDisplay({ bars }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        alignItems: "flex-end",
        margin: "25px",
        // border: "2px solid grey",
        borderRadius: "50px",
        padding: "20px",
        // width: "100vb",
        // height: "60vh",
      }}
    >
      {bars.map((value, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "lightblue",
            height: `${value * 5}px`,
            width: "75px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export default BarsDisplay;
