import {
  getGrossProjectionAPI,
  getProjectionAPI,
  getSpentAmountAPI,
} from "@/services/statistics";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/utils";
import { getProductsAPI } from "@/api/Product";
import { getSellAPI } from "@/services/sell";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import Sell from "@/components/Sell";
import ProductDashboard from "@/components/ProductDashboard";

const Dashboard = ({
  projection,
  grossProjection,
  products,
  sells,
  spentAmount,
}) => {
  const { user, loading } = useAuth();
  const navigate = useRouter();
  const data = Object.entries(projection).map(([key, value]) => ({
    name: key,
    proyeccion: value,
  }));

  if (loading) return <p>loading...</p>;
  if (!user && !loading) {
    if (typeof window !== "undefined")
      navigate.replace("/iniciar-sesion", undefined, { shallow: true });
    return null;
  }

  return (
    <div className="grid gap-x-4 grid-cols-1 md:grid-cols-5 p-2">
      <div className="bg-white shadow-md my-4 py-4 px-2 md:col-span-2 ">
        <p className="mb-2">Proyeccion esperada </p>
        <ResponsiveContainer width="100%" height="100%" aspect={2}>
          <AreaChart width={500} height={400} data={data}>
            <Tooltip formatter={(value) => `$${formatCurrency(value)}`} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="proyeccion"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="md:col-span-3">
        <div className="flex flex-wrap gap-4 mt-4 ">
          <div className="px-6 py-8 rounded-md bg-white flex-grow  h-40 shadow-md ">
            <p className="font-semibold text-xl mb-6">Valor del inventario </p>
            <p className="text-3xl font-bold text-green-500">
              ${formatCurrency(grossProjection)}
            </p>
          </div>
          <div className="px-6 py-8 rounded-md bg-white flex-grow h-40 shadow-md">
            <p className="font-semibold text-xl mb-6">Gastado</p>
            <p className="text-red-500 text-3xl font-bold ">
              ${formatCurrency(spentAmount)}
            </p>
          </div>
          <div className="px-6 py-8 rounded-md bg-white flex-grow h-40 shadow-md">
            <p className="font-semibold text-xl mb-6">Total de productos</p>
            <p className="text-3xl font-bold ">{products?.data.length}</p>
          </div>
          <div className="px-6 py-8 rounded-md bg-white flex-grow h-40 shadow-md">
            <p className="font-semibold text-xl mb-6">Total de ventas</p>
            <p className="text-3xl font-bold ">{sells?.data.length}</p>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-xl font-semibold">Tus productos</p>
          <div className="flex  flex-wrap gap-4 mt-4">
            {products.data.map((product) => (
              <ProductDashboard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="md:col-span-2 row-start-2">
        <p className="text-2xl font-semibold mt-4">Ventas de este mes</p>
        <Link href="/historial-ventas" className="underline text-blue-500 ">
          Ver historial
        </Link>
        <div className="flex flex-wrap gap-4 mt-4">
          {sells?.data.map((sell) => {
            return <Sell key={sell.id} sell={sell} />;
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const projection = await getProjectionAPI();
    const grossProjection = await getGrossProjectionAPI();
    const products = await getProductsAPI();
    const sells = await getSellAPI();
    const spentAmount = await getSpentAmountAPI();

    return {
      props: {
        projection,
        grossProjection,
        products,
        sells,
        spentAmount,
      },
    };
  } catch (error) {
    return {
      props: {
        projection: {},
        grossProjection: 0,
        products: {},
      },
    };
  }
};

export default Dashboard;
