import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './PieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  if (!total) return null;

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)', // Present - green
          'rgba(220, 53, 69, 0.7)', // Absent - red
          'rgba(255, 193, 7, 0.7)', // Given - yellow
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(255, 193, 7, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 16 },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="piechart-container">
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default PieChart;
