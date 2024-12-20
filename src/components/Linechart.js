/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const LineChart = () => {
  const chartRef = useRef(null);
  let lineChartInstance = null;

  useEffect(() => {
    const kpi1 = chartRef.current.getContext("2d");
    const gradientHeight = 500;
    const pointRadius = 3;
    const fontSize = 12;
    const paddingLeft = 10,
      paddingRight = 10,
      paddingTop = 50,
      paddingBottom = 10;

    const gradient1 = kpi1.createLinearGradient(0, 0, 0, gradientHeight);
    gradient1.addColorStop(0, "rgba(126, 171, 217, 1)");
    gradient1.addColorStop(1, "rgba(126, 171, 217, 0)");

    if (lineChartInstance) {
      lineChartInstance.destroy();
    }

    lineChartInstance = new Chart(kpi1, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [120, 190, 170, 250, 220, 300],
            fill: true,
            backgroundColor: gradient1,
            borderColor: "rgb(109, 148, 188,0)",
            pointBorderColor: "rgba(109, 148, 188, 1)",
            pointBorderWidth: 1.5,
            pointRadius: pointRadius,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        layout: {
          padding: {
            left: paddingLeft,
            right: paddingRight,
            top: paddingTop,
            bottom: paddingBottom,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
          datalabels: {
            display: true,
            align: "top",
            anchor: "start",
            offset: 4,
            color: "black",
            font: {
              size: fontSize,
              family: "Outfit",
            },
          },
        },
        scales: {
          x: {
            display: true,
            beginAtZero: true,
          },
          y: {
            display: true,
            beginAtZero: true,
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    return () => {
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      <canvas ref={chartRef} id="lineChart1" />
    </div>
  );
};

export default LineChart;