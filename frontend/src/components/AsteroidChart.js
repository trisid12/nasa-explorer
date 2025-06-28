import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AsteroidChart({ data, type }) {
  const getValues = (asteroid) => {
    switch (type) {
      case "size":
        return asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);
      case "speed":
        return parseFloat(
          asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
        ).toFixed(0);
      case "miss":
        return parseFloat(
          asteroid.close_approach_data[0].miss_distance.kilometers
        ).toFixed(0);
      default:
        return 0;
    }
  };

  const chartData = {
    labels: data.map((a) => a.name),
    datasets: [
      {
        label:
          type === "size"
            ? "Size (km)"
            : type === "speed"
            ? "Speed (km/h)"
            : "Miss Distance (km)",
        data: data.map(getValues),
        backgroundColor: "#1f6feb",
      },
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false, // 🛑 Turn off strict aspect ratio
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { ticks: { color: "#e6edf3" } },
    y: { ticks: { color: "#e6edf3" } },
  },
};

return (
<div className="chart-container">
  <Bar data={chartData} options={options} />
</div>

);

}

export default AsteroidChart;
