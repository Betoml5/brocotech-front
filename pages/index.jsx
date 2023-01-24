import { getProductsAPI } from "@/api/Product";
import Product from "@/components/Product";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps = async () => {
  const response = await getProductsAPI("?populate=*");
  const products = response.data;

  if (!products) {
    return {
      notFound: true,
    };
  }

  if (products.length === 0) {
    return {
      props: {
        products: [],
      },
    };
  }

  return {
    props: {
      products,
    },
  };
};

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Broco Tech</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
