import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <Image
        src="/empty-folder.png"
        width={300}
        height={300}
        alt="empty-folder"
      />
      <h1 className="text-2xl font-bold text-gray-500">
        Ups... Creo que te perdiste,{" "}
        <Link href="/" className="underline">
          vuelve al inicio
        </Link>
      </h1>
    </div>
  );
};

export default NotFound;
