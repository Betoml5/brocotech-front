import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className=" shadow-lg p-4">
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
    </header>
  );
};

export default Header;
