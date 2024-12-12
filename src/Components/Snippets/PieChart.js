import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({theme,data}) {

  const getChartBackgroundColor = () => {
    if (theme === 'dark') {
      return ['#fff','rgba(255,255,255,0.33)'];
    } else {
      return ['#333333','#808080'];
    }
  };

  const getChartBorderColor = () => {
    if (theme === 'dark') {
      return ['#414141','rgba(255,255,255,0.33)'];
    } else {
      return ['#808080', '#fff'];
    }
  };
  
  // const data = {
  //   labels: ['301681', '5935'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [301681, 5935],
  //       backgroundColor: getChartBackgroundColor(),
  //       borderColor: getChartBorderColor(),
  //       borderWidth: 4
  //     },
  //   ],
  // };

  const generateChartData = () => {
    const labels = data.map(record => record.label);
    const values = data.map(record => record.value);

    return {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: getChartBackgroundColor(),
          borderColor: getChartBorderColor(),
          borderWidth: 4
        }
      ]
    };
  };

  const [chartData, setChartData] = useState(generateChartData());
  const [labelColor, setLabelColor] = useState('#333');

  useEffect(() => {
    setChartData(generateChartData());
    setLabelColor(theme === 'dark' ? 'rgba(255,255,255,0.9)' : '#333');
  }, [theme, data]);

  return <Pie 
      data={chartData} 
      height="280"
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: labelColor, // Set label color based on the theme
            },
          },
          title: false
        },
      }}
    />;
}
