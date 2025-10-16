import BarChart from '../../common/Components/BarChar'; // Asegúrate de ajustar la ruta

// Datos de ejemplo para los gráficos
const monthlySales = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  data: [1200, 1900, 3000, 5000, 2300, 3400],
};

const topProducts = {
  labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
  data: [450, 300, 200, 150],
};

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen ">
      <h2 className="text-3xl font-bold  mb-6 text-center text-primary ">Panel de Control</h2>
      <p className="text-gray-600 mb-8 text-center ">
        Bienvenido. Aquí tienes una vista general de tus informes y métricas clave.
      </p>

      {/* Grid de Gráficos (Tailwind CSS: grid, gap) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Primer Gráfico: Ventas Mensuales */}
        <BarChart
          title="Ventas Mensuales (en USD)"
          labels={monthlySales.labels}
          data={monthlySales.data}
          backgroundColor="rgba(75, 192, 192, 0.6)"
          borderColor="rgba(75, 192, 192, 1)"
        />

        {/* Segundo Gráfico: Productos más Vendidos */}
        <BarChart
          title="Unidades de Productos Vendidos"
          labels={topProducts.labels}
          data={topProducts.data}
          backgroundColor="rgba(255, 99, 132, 0.6)"
          borderColor="rgba(255, 99, 132, 1)"
        />

        {/* Puedes añadir más componentes aquí, como tarjetas de métricas (KPIs) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Ingresos Totales" value="$15,800" color="bg-green-500" />
          <Card title="Nuevos Usuarios" value="452" color="bg-blue-500" />
          <Card title="Tasa de Conversión" value="4.5%" color="bg-yellow-500" />
        </div>
      </div>
    </div>
  );
}

// Componente simple de Tarjeta para KPIs
interface CardProps {
    title: string;
    value: string;
    color: string;
}

const Card: React.FC<CardProps> = ({ title, value, color }) => (
    <div className={`p-5 rounded-lg shadow-lg ${color} text-white`}>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
);