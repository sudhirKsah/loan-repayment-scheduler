import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Charts = ({ schedule }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (schedule.length > 0) {
      const labels = schedule.map((row) => row.date);
      const principalData = schedule.map((row) => parseFloat(row.principal));
      const interestData = schedule.map((row) => parseFloat(row.interest));

      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Principal",
              data: principalData,
              borderColor: "rgba(75, 192, 192, 1)",
              fill: false,
            },
            {
              label: "Interest",
              data: interestData,
              borderColor: "rgba(255, 99, 132, 1)",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
          },
        },
      });

      return () => chart.destroy();
    }
  }, [schedule]);

  return <canvas ref={chartRef} />;
};

export default Charts;