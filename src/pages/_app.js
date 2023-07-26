import { useReducer } from "react";
import { MainContext, initialState } from "@/store";
import { mainReducer } from "@/store/reducers";

// import style
import "@/styles/globals.scss";

// import Google font
import { Inter } from "next/font/google";

import DefaultLayout from "@/components/layouts/DefaultLayout";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <DefaultLayout>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </DefaultLayout>
    </MainContext.Provider>
  );
}
