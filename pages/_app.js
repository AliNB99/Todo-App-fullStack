import Layout from "components/layout/Layout";
import { SessionProvider } from "next-auth/react";
import "styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </SessionProvider>
  );
}
