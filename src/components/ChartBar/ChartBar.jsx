import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const labels = ["January", "February", "March", "April", "May", "June", "July"];

const ChartBar = () => {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Balance",
            data: labels.map(() =>
              faker.datatype.number({ min: -1000, max: 1000 })
            ),
            backgroundColor: "#211842",
          },
        ],
      }}
    />
  );
};

export default ChartBar;
