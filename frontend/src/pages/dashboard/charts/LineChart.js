import React from "react";
import { Line } from "react-chartjs-2";
import { numberWithComma } from "../functions/NumberFunctions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Add this line
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Add this line
);

function LineChart(props) {
  const labelSet = props.data.map((m) => m.months);
  const dataSet = props.data.map((m) => m.sums);

  const data = {
    labels: labelSet,
    datasets: [
      {
        label: "Earnings",
        data: dataSet,
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0,
      },
    },
    scales: {
      x: {
        time: {
          unit: "date",
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 7,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          callback: function (value) {
            return "$" + numberWithComma(value);
          },
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2],
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: "#6e707e",
        titleFontSize: 14,
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: "index",
        caretPadding: 10,
        callbacks: {
          label: function (tooltipItem) {
            return (
              tooltipItem.dataset.label +
              ": $" +
              numberWithComma(tooltipItem.raw)
            );
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
