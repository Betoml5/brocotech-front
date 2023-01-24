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

export const getStaticPaths = async () => {
  const response = await getProductsAPI("?populate=*");

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
    const response = await getProductAPI(params.id, "?populate=*");
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

  const whatsAppMessage = `Hola, estoy interesado en esta laptop ${product.name}`;

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <div className="max-w-2xl mx-auto p-6">
        <div className="relative flex flex-col    font-Montserrat  p-4 shadow-xl rounded-lg  ">
          <p className="absolute z-50 text-[#674188] rounded-full px-4 py-1 -right-2 top-0 bg-[#C3ACD0] font-bold">
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
                    className=" w-full rounded-lg "
                    src={`http://localhost:1337${image.attributes.url}`}
                    alt="image"
                  />
                </SwiperSlide>
              </SwiperSlide>
            ))}
          </Swiper>

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
