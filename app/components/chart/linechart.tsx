"use client"

import {useState} from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export const LineChart = ( {lineChartData, charttype}) => {
  //const   [tempData, setTempdata] = useState(lineChartData);
  const data = {
    labels: lineChartData.labels,
    datasets: [
      {
        label: lineChartData.label ??'Gold Price (INR per 10 gm)',
        data:lineChartData.data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,1)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: lineChartData.label ?? 'Gold Price (INR per 10 gm) from July to December 2023',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'yellow', // Change x-axis label color
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          color: 'yellow', // Change x-axis label color
        },
      },
    },
  };

  return charttype == "line" ? <Line data={data} options={options} /> : <Bar data={data} options={options} />;
};


