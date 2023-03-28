import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{"page not found"}</title>

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/img/fiverr-icon.svg" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-2xl text-error">404 - Page Not Found</h1>
      </div>
    </>
  );
}
