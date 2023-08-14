import { formatCurrency } from "@/utils";
import React from "react";

const ProductDashboard = ({ product }) => {
  return (
    <div className="flex-grow bg-white shadow-md rounded-md px-4 py-6">
      <p className="font-bold text-2xl mb-2">{product.attributes.name}</p>
      <p>
        Costo:{" "}
        <span className="text-red-500">
          ${formatCurrency(product.attributes.cost)}
        </span>
      </p>
      <p>
        Venta:{" "}
        <span className="text-green-500">
          {formatCurrency(product.attributes.price)}
        </span>
      </p>
      <p>
        Estado:{" "}
        {product.attributes.avaliable ? (
          <span className="text-green-500 font-semibold">Disponible</span>
        ) : (
          <span className="text-red-500 font-semibold">No disponible</span>
        )}
      </p>
    </div>
  );
};

export default ProductDashboard;
