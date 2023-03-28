import Navbar from "./Navbar";

import Head from "next/head";
import Footer from "./Footer";

const Layout = ({ children, title, description, indexed }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? title : ""}</title>
        <meta name="description" content={description ? description : ""} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta charSet="utf-8" />
        <meta
          name="robots"
          content={indexed ? "index,follow" : "noindex,nofollow"}
        />
        <link rel="icon" href="/img/fiverr-icon.svg" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
