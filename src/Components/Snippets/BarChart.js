import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['Empty', 'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023'];

export function BarChart({theme,monthlyData}) {
  
  const getChartBackgroundColor1 = () => {
    if (theme === 'dark') {
      return '#fff';
    } else {
      return '#333333';
    }
  };

  const getChartBackgroundColor2 = () => {
    if (theme === 'dark') {
      return 'rgba(255,255,255,0.33)';
    } else {
      return '#808080';
    }
  };

  const [chartData, setChartData] = useState({});
  const [labelColor, setLabelColor] = useState('#333');

  useEffect(() => {
    const generateChartData = () => {
      if (monthlyData) {
        const labels = monthlyData.map(record => record.monthYear);
        const rawDocsData = monthlyData.map(record => record.rawDocs);
        const iRecDocsData = monthlyData.map(record => record.iRecDocs);

        return {
          labels: labels,
          datasets: [
            {
              label: 'Pending Documents For NFT',
              data: rawDocsData,
              backgroundColor: getChartBackgroundColor1(),
            },
            {
              label: 'NFTs Created',
              data: iRecDocsData,
              backgroundColor: getChartBackgroundColor2(),
            },
          ],
        };
      }
      return {};
    };

    setChartData(generateChartData());
    setLabelColor(theme === 'dark' ? 'rgba(255,255,255,0.9)' : '#333');
  }, [theme, monthlyData]);


  return chartData.labels ? (
  <Bar options={{
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: labelColor, // Set label color based on the theme
        },
      },
      scales: {
        x: {
            ticks: {
                color: '#000'
            },
        },
      },
      title: false
    },
  }} data={chartData} 
  />
  
  ) : null;
}
