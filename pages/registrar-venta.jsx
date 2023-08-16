import { getProductsAPI } from "@/api/Product";
import Link from "next/link";

const RegisterSell = ({ products }) => {
  return (
    <div className=" m-4">
      <Link href="/historial-ventas" className="p-2 border border-black rounded-md">
        Volver
      </Link>
      <form className="flex flex-col p-4 max-w-xl mx-auto">
        <select
          className="p-2 shadow-md rounded-md"
          name="product"
          id="product"
        >
          {products.data.map((product) => (
            <option key={product.id} value={product.id}>
              {product.attributes.name}
            </option>
          ))}
        </select>
        <input
          className="p-2 shadow-md rounded-md my-4"
          type="date"
          name="date"
          id="date"
        />
        <button className="p-2 border border-black rounded-md" type="submit">
          <span>Registrar</span>
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const products = await getProductsAPI();

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default RegisterSell;
