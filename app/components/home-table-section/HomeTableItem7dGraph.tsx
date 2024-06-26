"use client";
import { AppContext } from "@/app/contexts/AppContext";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { useContext } from "react";
import { Line } from "react-chartjs-2";

export default function HomeTableItem7dGraph({ prices }: { prices: number[] }) {
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
  );
  const { theme, colors } = useContext(AppContext);

  const firstPrice = prices[0];
  const secondPrice = prices[prices.length - 1];

  const increasedValueColor =
    theme === "dark" ? colors.greenMain : colors.greenSecondary;
  const decreasedValueColor = colors.redMain;

  const data = {
    labels: Array.from({ length: prices.length }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        data: prices,
        pointBorderColor: "black",
        borderColor:
          firstPrice < secondPrice ? increasedValueColor : decreasedValueColor,
        pointBackgroundColor: "transparent",
        tension: 0,
        borderWidth: 2,
        pointRadius: 0,
        pointBorderWidth: 1,
        hitRadius: 20,
        hoverBorderWidth: 2,
      },
    ],
  };

  return (
    <>
      <div className="w-[127px] h-[70px] flex justify-center items-center">
        <Line data={data} options={options} />
      </div>
    </>
  );
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
};
