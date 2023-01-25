import { imagePrefix, server } from "@/config";
import Image from "next/image";
import React from "react";

const Product = ({ product }) => {
  const width = product.image.data[0].attributes.width;
  const height = product.image.data[0].attributes.height;
  const attributes = product.description?.split("\n");

  return (
    <div className="relative flex flex-col    font-Montserrat  p-4 shadow-xl rounded-lg">
      <p className="absolute text-[#674188] rounded-full px-4 py-1 -right-2 top-0 bg-[#C3ACD0] font-bold">
        {product.name}
      </p>
      <Image
        width={width}
        height={height}
        className=" w-full  md:object-cover md:h-40 xl:h-96 rounded-lg"
        src={`${imagePrefix}${product.image.data[0].attributes.url}`}
        alt="image"
      />

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
    </div>
  );
};

export default Product;
