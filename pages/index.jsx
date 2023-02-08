import { getProductsAPI } from "@/api/Product";
import { getAlertsAPI } from "@/api/Alert";
import Alert from "@/components/Alert";
import Product from "@/components/Product";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const getStaticProps = async () => {
  try {
    const response = await getProductsAPI(
      "?populate=*&sort[0]=avaliable%3Adesc"
    );
    const products = response.data;
    const alertResponse = await getAlertsAPI();
    const alert = alertResponse.data;

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
          alert: null,
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
        alert: null,
      },
    };
  }
};

export default function Home({ products, alert: widget }) {
  const [alert, setAlert] = useState(true);
  const [query, setQuery] = useState("");
  const [customReqAlert, setCustomRegAlert] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const onFilter = (query) => {
    console.log(query);
    console.log(products);
    const filterProducts = products.filter((item) =>
      query
        .toLowerCase()
        .includes(item.attributes.category.data.attributes.name.toLowerCase())
    );
    setFilteredProducts(filterProducts);
  };

  const searchFilter = (array) => {
    return array.filter(
      ({ attributes: item }) =>
        item?.name.toLowerCase().includes(query.toLowerCase()) ||
        item?.brand.toLowerCase().includes(query.toLowerCase()) ||
        item?.category.data.attributes.name
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        item?.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filtered = searchFilter(products);

  if (!products.length)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <Image
          src="/empty-folder.png"
          width={300}
          height={300}
          alt="empty-folder"
        />
        <h1 className="text-2xl font-bold text-gray-500">
          No hay productos que mostrar
        </h1>
      </div>
    );

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
        message={[
          "¡Hola! ¿Quieres un celular o laptop especifico? Puedes pedirlo en la sección de ",
          <Link className="underline" href="/pedido" key="pedido-personalizado">
            Pedido personalizado
          </Link>,
          " y nosotros te lo conseguimos.",
        ]}
        show={customReqAlert}
        setShow={setCustomRegAlert}
        type="success"
      />

      {/* Aqui validaremos si es visible, tiene prioridad y no se pude borrar */}
      {widget &&
        widget.map((item) => {
          return (
            <Alert
              key={item.id}
              message={item.attributes.description}
              show={alert}
              setShow={setAlert}
              alwaysVisible={item.attributes.alwaysVisible}
              type="success"
            />
          );
        })}

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 max-w-[1440px] mx-auto">
        <Link
          href="https://www.facebook.com/permalink.php?story_fbid=pfbid026PDGwp7i1DjDwcuhMi9W5TUUeotwRr4k9paB88PGEK6pBEv3vsC1WFedHSh1aN79l&id=102581285616187"
          className="flex overflow-hidden  col-span-full items-center justify-center place-content-center"
        >
          <Image
            src="/giveaway.jpg"
            width={550}
            height={550}
            alt="giveaway"
            className="  object-cover md:w-1/2 "
          />
          <Image
            src="/giveaway.jpg"
            width={550}
            height={550}
            alt="giveaway"
            className="   object-cover md:w-1/2 "
          />
          <Image
            src="/giveaway.jpg"
            width={550}
            height={550}
            alt="giveaway"
            className=" object-cover md:w-1/2 "
          />
        </Link>

        <div className="flex flex-col  col-span-full">
          <label htmlFor="search" className="mb-2 font-light ">
            Buscador
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="md:w-1/2 lg:w-1/3 p-2 rounded-md shadow-lg"
            placeholder="Buscar por nombre o marca"
            id="search"
          />

          <Link
            id="pedido-personalizado"
            href="/pedido"
            className="mb-2 underline"
          >
            Quiero un pedido personalizado
          </Link>

          <div>
            <select
              onChange={(e) => {
                onFilter(e.target.value);
              }}
              name="category"
              id="category"
              className="p-2 shadow-md"
              defaultValue="Selecciona un filtro"
            >
              <option value="" disabled selected>
                Selecciona una filtro
              </option>
              <option value="">Todos</option>
              <option value="laptops">Laptops</option>
              <option value="celulares">Celulares</option>
              <option value="audifonos asistentes virtuales ">Otros</option>
            </select>
          </div>
        </div>
        {filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Product product={product.attributes} />
            </Link>
          ))}

        {filtered.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Product product={product.attributes} />
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col col-span-full items-center justify-center ">
            <Image
              src="/empty-folder.png"
              width={300}
              height={300}
              alt="empty-folder"
            />
            <h1 className="text-2xl font-bold text-gray-500">
              No encontramos el producto que buscas.
            </h1>
          </div>
        )}
      </main>
    </>
  );
}
