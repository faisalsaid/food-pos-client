import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

faker.seed(123);
export default function MainChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const labels = ['Jan', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'];
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Menu',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(129, 226, 162, 0.5)',
      },
      {
        fill: true,
        label: 'Item',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 109, 197, 0.5)',
      },
      {
        fill: true,
        label: 'Income',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(192, 143, 255, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
