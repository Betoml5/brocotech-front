import Image from "next/image";
import Link from "next/link";
import React from "react";

const whatsAppMessage = `Hola estoy interesado en los productos de Broco Tech.`;

const Header = () => {
  return (
    <header className="flex items-center justify-between shadow-lg p-4">
      <Link className="flex items-center " href="/">
        <div className="bg-black p-1 rounded-full">
          <Image
            className="w-14  "
            src="/brocologo.png"
            width={1280}
            height={1024}
            alt="brocotech"
          />
        </div>
        <h1 className="ml-4 font-Montserrat ">Broco Tech</h1>
      </Link>
      <Link
        target={"_blank"}
        href={`https://wa.me/528611262242?text=${whatsAppMessage}`}
      >
        <Image src="/whatsapp.png" width={30} height={30} alt="whatsapplogo" />
      </Link>
    </header>
  );
};

export default Header;
