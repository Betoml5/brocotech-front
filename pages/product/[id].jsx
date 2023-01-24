import { getProductAPI, getProductsAPI } from "@/api/Product";
import { formatCurrency } from "@/utils";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const getStaticPaths = async () => {
  const response = await getProductsAPI();
  const products = response.data;

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  try {
    const response = await getProductAPI(params.id);
    const product = response.data;

    if (product === null) {
      throw new Error(`Item with id ${params?.id} was not found.`);
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const ProductDetails = ({ product: { attributes: product } }) => {
  const width = product.image.data[0].attributes.width;
  const height = product.image.data[0].attributes.height;
  const attributes = product.description?.split("\n");

  console.log(product.image);
  const whatsAppMessage = `Hola, estoy interesado en esta laptop ${product.name}`;

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <div className="max-w-2xl mx-auto p-6">
        <div className="relative flex flex-col    font-Montserrat  p-4 shadow-xl rounded-lg  ">
          <p className="absolute text-[#674188] rounded-full px-4 py-1 -right-2 top-0 bg-[#C3ACD0] font-bold">
            {product.name}
          </p>
          <Image
            width={width}
            height={height}
            className=" w-full h-fit  rounded-lg "
            src={`http://localhost:1337${product.image.data[0].attributes.url}`}
            alt="image"
          />

          <div className="flex justify-between items-center mt-2 -ml-2">
            <p className="text-green-500 font-semibold first-line:ml-2">
              ${formatCurrency(product.price)}
            </p>
            <p
              className={` px-4 py-1 rounded-full font-semibold  ${
                product.avaliable ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.avaliable ? "En stock" : "Agotado"}
            </p>
          </div>

          <div className="flex  gap-2 items-center flex-wrap  mt-2">
            {attributes.map((item) => (
              <p
                className="text-center flex-grow bg-[#FFFBF5] font-light shadow-md px-6 py-1 rounded-lg w-fit"
                key={item}
              >
                {item}
              </p>
            ))}
            <p className="flex-grow text-center bg-[#FFFBF5] font-light shadow-md px-6 py-1 rounded-lg w-fit">
              {product.category.data.attributes.name}
            </p>
          </div>
          <Link
            target={"_blank"}
            href={`https://wa.me/528611262242?text=${whatsAppMessage}	`}
            className="text-center font-semibold bg-[#674188] text-[#e2c6f0] shadow-xl py-2 rounded-md mt-4 hover:opacity-90"
          >
            COMPRAR
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
