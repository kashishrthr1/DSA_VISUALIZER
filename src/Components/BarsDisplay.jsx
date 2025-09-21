import "../App.css";

function BarsDisplay({ bars, inputSize }) {
  if (!bars || !bars.bars) return null;

  const { bars: array, comparing = [], swapping = [] } = bars;

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        alignItems: "flex-end",
        margin: "25px",
        borderRadius: "50px",
        padding: "20px",
      }}
    >
      {array.map((value, index) => {
        let color = "lightblue";
        if (comparing.includes(index)) color = "orange";
        if (swapping.includes(index)) color = "red";

        return (
          <div
            key={index}
            style={{
              backgroundColor: color,
              height: `${value * 5}px`,
              width: `${400 / inputSize}px`,
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
}

export default BarsDisplay;
