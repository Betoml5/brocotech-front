import { formatCurrency } from "../utils/index";
const Sell = ({ sell }) => {
  return (
    <div
      className="flex-grow   bg-white rounded-md shadow-md p-2"
      key={sell.id}
    >
      <p className="font-bold">
        {sell.attributes.product.data.attributes.name}
      </p>
      <p className="mt-1">
        <span>Venta:</span>
        <span className="text-green-500 font-bold">
          {" "}
          ${formatCurrency(sell.attributes.product.data.attributes.price)}
        </span>
      </p>
      <p>
        <span>Costo: </span>
        <span className="text-red-500 font-bold">
          ${formatCurrency(sell.attributes.product.data.attributes.cost)}
        </span>
      </p>
      <p className="mt-4 mb-2">
        Fecha de venta:{" "}
        <span className="font-semibold">{sell.attributes.date}</span>
      </p>
    </div>
  );
};

export default Sell;
