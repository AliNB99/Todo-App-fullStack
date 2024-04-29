import Layout from "components/layout/Layout";
import { SessionProvider } from "next-auth/react";
import "styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </SessionProvider>
  );
}
