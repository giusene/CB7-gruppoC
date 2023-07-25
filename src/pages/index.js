import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Navbar from "@/components/Navbar";


import { GET } from "@/utils/HTTP"



const inter = Inter({ subsets: ["latin"] });

export default function Home({trending, pippo}) {

  console.log(trending)
  console.log(pippo)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DefaultLayout></DefaultLayout>
      </main>
    </>
  );
}










export async function getServerSideProps() {

  const trending = await GET("trending/movie/", "day")
  const pippo = await GET("search/", "movie", "", "barbie")


  return  {
    props:{
      trending,
      pippo
    }
  }

}