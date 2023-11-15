import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ['Coffee', 'Pizza', 'Burger', 'Ice Cream', 'Noodle'];

export default function DoughnutChart({ topMenu }) {
  console.log(topMenu);

  const data = {
    labels: topMenu?.map((menu) => menu.menuTitle),
    datasets: [
      {
        label: '# Best of 5',
        data: topMenu?.map((menu) => menu.totalQuantity),
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
      },
    ],
  };
  const options = {
    // responsive: true,
    maintainAspectRatio: false,
  };
  return <Doughnut options={options} data={data} />;
}
