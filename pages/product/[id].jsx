import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

SwiperCore.use([Pagination, Navigation, Autoplay]);

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { getProductAPI, getProductsAPI } from "@/api/Product";
import { formatCurrency } from "@/utils";
import { server, imagePrefix } from "@/config";

export const getStaticPaths = async () => {
  const response = await getProductsAPI("?populate=*");
  const products = response.data;

  if (!products) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const paths = products.map((product, index) => {
    if (product == null) {
      throw new Error(
        `An product entry with no data was found at index ${index}`
      );
    }

    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  try {
    const response = await getProductAPI(params.id, "?populate=*");
    const product = response.data;
    const responseSidebar = await getProductsAPI(
      `?filters[id][$ne]=${params.id}&populate=*&pagination[start]&pagination[limit]=3`
    );
    const productsSidebar = responseSidebar.data;

    if (product === null) {
      throw new Error(`Item with id ${params?.id} was not found.`);
    }

    if (!productsSidebar || productsSidebar.length === 0) {
      return {
        props: {
          product,
          productsSidebar: [],
        },
        revalidate: 60,
      };
    }

    return {
      props: {
        product,
        productsSidebar,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const ProductDetails = ({
  product: { id: productId, attributes: product },
  productsSidebar,
}) => {
  const width = product.image.data[0].attributes.width || 500;
  const height = product.image.data[0].attributes.height || 500;
  const attributes = product.description?.split("\n") || [];
  const whatsAppMessage = `Hola, estoy interesado en este producto ${product.name}`;
  console.log(productsSidebar.length);
  const isOffer = product?.offerPrice > 0;

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-8  font-Montserrat max-w-2xl mx-auto p-6 lg:max-w-7xl">
        <div
          className={`${
            productsSidebar.length === 0 &&
            "lg:col-span-full  xl:col-span-full "
          }  relative flex flex-col    font-Montserrat  p-4 shadow-xl rounded-lg lg:col-span-5  lg:row-span-1 xl:col-span-6 `}
        >
          <p className="absolute z-50 text-[#674188] rounded-full px-4 py-1 -left-2 top-0 bg-[#C3ACD0] font-bold border-2 border-[#674188]">
            {product.name}
          </p>
          <Swiper
            navigation
            loop={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            slidesPerView={1}
            className="w-full h-fit"
            style={{
              "--swiper-navigation-color": "#674188",
              "--swiper-pagination-color": "#674188",
            }}
          >
            {product.image.data.map((image) => (
              <SwiperSlide key={image.id}>
                <SwiperSlide>
                  <Image
                    width={width}
                    height={height}
                    className=" lg:w-full lg:h-[450px] object-cover object-center rounded-lg "
                    src={`${image.attributes.url}`}
                    alt="image"
                  />
                </SwiperSlide>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-between items-center mt-2 -ml-2  text-lg">
            <div className="flex items-center gap-x-4">
              <p
                className={`text-green-500 font-semibold first-line:ml-2 ${
                  isOffer && "line-through   text-black"
                }`}
              >
                ${formatCurrency(product.price)}
              </p>
              {isOffer && (
                <p className="text-red-500 font-semibold first-line:ml-2 ">
                  ${formatCurrency(product?.offerPrice)}
                </p>
              )}
            </div>
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

        {productsSidebar.length > 0 && (
          <div className="my-4 lg:col-span-3 lg:row-span-2 lg:m-0 xl:col-span-2">
            <p className="lg:text-lg my-4 lg:text-right lg:m-0 lg:mb-4 lg:font-semibold xl:mb-5 ">
              <span className="underline">Tambien te podria interesar</span> 🥦
            </p>

            <div className="grid place-items-center grid-cols-3 md:grid-cols-2  lg:grid-cols-1  mt-2 lg:place-items-end lg:gap-y-4">
              {productsSidebar.map(({ id, attributes: product }) => {
                const width = product.image.data[0].attributes.width;
                const height = product.image.data[0].attributes.height;
                //Esto es para que no se repita el producto en el sidebar
                if (productId !== id) {
                  return (
                    <Link
                      className="relative bg-white  w-24 h-20 md:w-32 md:h-32 lg:w-72 lg:h-72 lg:shadow-md lg:p-4 lg:rounded-md"
                      href={`/product/${id}`}
                      key={id}
                    >
                      <Image
                        width={width}
                        height={height}
                        className=" w-full h-full object-cover  rounded-lg "
                        src={`${product.image.data[0].attributes.url}`}
                        alt="image"
                      />
                      <p className="absolute -top-2 -right-3 truncate text-ellipsis text-[9px] z-50 text-[#674188] rounded-full px-2 py-1   bg-[#C3ACD0] font-bold md:text-base md:px-4 md:py-2">
                        {product.name}
                      </p>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
