import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useChartPoints } from "@/stores/typing-store";
import { useTheme } from "@/stores/preferences-store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const StatisticsChart = () => {
  const chartPoints = useChartPoints();
  const { primaryColor } = useTheme();

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const point = chartPoints[index];
            const { acc, wpm, mistakesCount } = point;
            return `wpm: ${wpm}  acc: ${acc}%  errors: ${mistakesCount}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          maxTicksLimit: 3,
        },
        beginAtZero: false,
      },
    },
  };

  const data: ChartData<"line"> = {
    labels: chartPoints.map((_, i) => i + 1),
    datasets: [
      {
        data: chartPoints.map((point) => point.wpm),
        borderColor: `hsl(${primaryColor})`,
        backgroundColor: `hsl(${primaryColor})`,
        tension: 0.3,
      },
    ],
  };
  return (
    <div className="flex h-full w-full">
      <Line options={options} data={data} />
    </div>
  );
};
