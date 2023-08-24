import { formatCurrency } from "@/utils";
import React from "react";

const ProductDashboard = ({ product, handleCopy }) => {
  return (
    <div className="flex-grow bg-white shadow-md rounded-md px-4 py-6">
      <p className="font-bold text-xl mb-2">{product.attributes.name}</p>
      <p>
        Venta:{" "}
        <span className="font-semibold text-green-500">
          ${formatCurrency(product.attributes.price)}
        </span>
      </p>
      <p>
        Costo:{" "}
        <span className="font-semibold text-red-500">
          ${formatCurrency(product.attributes.cost)}
        </span>
      </p>

      <p>
        Estado:{" "}
        {product.attributes.avaliable ? (
          <span className="text-green-600 font-semibold">Disponible</span>
        ) : (
          <span className="text-red-500 font-semibold">No disponible</span>
        )}
      </p>
      <button
        onClick={() => handleCopy(product)}
        className="mt-1 underline text-blue-500"
      >
        Copiar especificaciones
      </button>
    </div>
  );
};

export default ProductDashboard;
