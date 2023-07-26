// import style
import "@/styles/globals.scss";

// import Google font
import { Inter } from "next/font/google";

import DefaultLayout from "@/components/layouts/DefaultLayout";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </DefaultLayout>
  );
}
