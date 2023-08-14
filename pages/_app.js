import Layout from "@/components/Layout";
import AuthProvider from "@/context/Contex";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextNProgress from "nextjs-progressbar";

const client = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
          <NextNProgress />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}
