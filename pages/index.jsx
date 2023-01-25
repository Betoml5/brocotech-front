import { getProductsAPI } from "@/api/Product";
import Product from "@/components/Product";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps = async () => {
  const response = await getProductsAPI("?populate=*");
  console.log(response);
  const products = response.data;

  if (!products) {
    return {
      props: {
        products: [],
      },
    };
  }

  return {
    props: {
      products,
      revalidate: 60,
    },
  };
};

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Broco Tech</title>
        <meta
          name="description"
          content="Brocotech, venta de laptops y celulares. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <Image
            src="/empty-folder.png"
            width={300}
            height={300}
            alt="empty-folder"
          />
          <h1 className="text-2xl font-bold text-gray-500">
            No hay productos que mostrar.
          </h1>
        </div>
      )}

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 max-w-[1440px] mx-auto">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Product product={product.attributes} />
          </Link>
        ))}
      </main>
    </>
  );
}
