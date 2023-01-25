import { getAlertsAPI, getProductsAPI } from "@/api/Product";
import Alert from "@/components/Alert";
import Product from "@/components/Product";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const getStaticProps = async () => {
  try {
    const response = await getProductsAPI("?populate=*");
    const products = response.data;
    const alertResponse = await getAlertsAPI();
    const alert = alertResponse.data;

    console.log(alertResponse);

    if (!products) {
      return {
        props: {
          products: [],
        },
      };
    }

    if (!alert) {
      return {
        props: {
          products,
          alert: {},
        },
      };
    }

    return {
      props: {
        products,
        alert,
        revalidate: 60,
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
        alert: {},
      },
    };
  }
};

export default function Home({ products }) {
  const [alert, setAlert] = useState(true);

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

      <Alert
        title="¡Bienvenido a Broco Tech!"
        show={alert}
        setShow={setAlert}
        alwaysVisible
      />

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
