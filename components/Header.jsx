import Image from "next/image";
import Link from "next/link";
import React from "react";

const whatsAppMessage = `Hola estoy interesado en los productos de Broco Tech.`;

const Header = () => {
  return (
    <header className="flex items-center justify-between shadow-lg p-4">
      <Link className="flex items-center " href="/">
        <Image
          className="w-16 h-16  "
          src="/brocologo.png"
          width={1280}
          height={1024}
          alt="brocotech"
        />

        <h1 className="ml-2 font-Montserrat text-xl">Broco Tech</h1>
      </Link>
      <div className="flex flex-row-reverse gap-x-4">
        <Link
          target={"_blank"}
          href={`https://wa.me/528611262242?text=${whatsAppMessage}`}
        >
          <Image
            src="/whatsapp.png"
            width={30}
            height={30}
            alt="whatsapplogo"
          />
        </Link>
        <Link
          target={"_blank"}
          href="https://www.facebook.com/BrocoTech-102581285616187"
        >
          <Image
            src="/facebook.png"
            width={30}
            height={30}
            alt="whatsapplogo"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
