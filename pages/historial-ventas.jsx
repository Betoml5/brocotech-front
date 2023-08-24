import useAuth from "@/hooks/useAuth";
import { getSellAPI } from "@/services/sell";
import { formatCurrency } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SellHistory = ({ sells }) => {
  const { user, loading } = useAuth();
  const navigate = useRouter();

  if (loading) return <p>Loading...</p>;
  if (!user && !loading) {
    if (typeof window !== "undefined")
      navigate.replace("/iniciar-sesion", undefined, { shallow: true });
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <Link href="/dashboard" className="p-2 border border-black rounded-md">
          Dashboard
        </Link>
        <Link
          href="/registrar-venta"
          className="p-2 border border-black rounded-md"
        >
          Registrar venta
        </Link>
      </div>
      <div className="overflow-x-auto ">
        <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6">
                Producto
              </th>
              <th scope="col" className="py-3 px-6">
                Venta
              </th>
              <th scope="col" className="py-3 px-6">
                Costo
              </th>
              <th scope="col" className="py-3 px-6">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {sells?.data?.map((sell) => (
              <tr
                key={sell.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="py-4 px-6">{sell.id}</td>
                <td className="py-4 px-6">
                  {sell.attributes.product.data.attributes.name}
                </td>
                <td className="text-red-500 py-4 px-6">
                  $
                  {formatCurrency(
                    sell.attributes.product.data.attributes.price
                  )}
                </td>
                <td className="text-green-500 py-4 px-6">
                  $
                  {formatCurrency(sell.attributes.product.data.attributes.cost)}
                </td>
                <td className="py-4 px-6">{sell.attributes.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const sells = await getSellAPI();
    return {
      props: {
        sells,
      },
    };
  } catch (error) {
    return {
      props: {
        sells: {},
      },
    };
  }
};

export default SellHistory;
