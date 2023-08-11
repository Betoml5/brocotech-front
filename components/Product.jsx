import { imagePrefix, server } from "@/config";
import Image from "next/image";
import React from "react";

const Product = ({ product }) => {
  // let image;
  // let width;
  // let height;
  // if (!product.image.data) {
  //   image = "/no-photo.png";
  //   width = 300;
  //   height = 300;
  // } else {
  //   image = image = product.image?.data[0]?.attributes.url;
  //   width = product.image?.data[0]?.attributes.width;
  //   height = product.image?.data[0]?.attributes.height;
  // }

  const attributes = product.description?.split("\n");
  return (
    <div className="relative flex flex-col    font-Montserrat  p-4 shadow-xl rounded-lg h-full">
      <p className="absolute text-[#674188] rounded-full px-4 py-1 -right-2 top-0 bg-[#C3ACD0] font-bold">
        {product.name}
      </p>
      {/* <Image
        width={width}
        height={height}
        className=" w-full  md:object-cover md:h-40 xl:h-96 rounded-lg"
        src={`${image}`}
        alt="image"
      /> */}

      <div className="flex items-center justify-between mt-2 -ml-2">
        <p
          className={` px-4 py-1 rounded-full font-semibold  ${
            product.avaliable ? "text-green-500" : "text-red-500"
          }`}
        >
          {product.avaliable ? "En stock" : "Agotado"}
        </p>

        {product.offerPrice > 0 && (
          <p className="text-red-500 font-bold animate-pulse">¡En oferta! </p>
        )}
      </div>

      <div className="flex  gap-2 items-center flex-wrap  mt-2 flex-1">
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
    </div>
  );
};

export default Product;
