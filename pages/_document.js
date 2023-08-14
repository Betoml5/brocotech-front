import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es-MX">
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
        />
        <link rel="icon" href="/brocologo.png" />
      </Head>
      <body className="bg-[#F9F7F7]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
