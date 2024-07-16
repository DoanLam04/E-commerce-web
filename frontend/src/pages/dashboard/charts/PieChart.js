import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart(props) {
  const { data } = props;

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.total),
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
        hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
    },
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  };

  return <Pie data={chartData} options={options} />;
}

export default PieChart;
