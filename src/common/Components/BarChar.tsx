import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

// 1. Registrar los componentes de Chart.js que vamos a usar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 2. Definir los tipos de las props para el componente
interface BarChartProps {
  title: string;
  data: number[];
  labels: string[];
  borderColor: string;
  backgroundColor: string;
}

const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  labels,
  borderColor,
  backgroundColor,
}) => {
  // 3. Configuración de los datos del gráfico
  const chartData: ChartData<'bar'> = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
    ],
  };

  // 4. Opciones del gráfico (responsividad, títulos, etc.)
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    maintainAspectRatio: false, // Permitir controlar el tamaño con Tailwind
  };

  // 5. Renderizar el componente Bar de react-chartjs-2
  return (
    <div className="h-80 w-full p-4 bg-white rounded-lg shadow-lg">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;