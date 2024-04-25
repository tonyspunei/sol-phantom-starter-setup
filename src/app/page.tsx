"use client";
import { NextPage } from "next";
import WalletContextProvider from "@/components/WalletContextProvider";
import { AppBar } from "@/components/AppBar";

const Home: NextPage = (props) => {
  return (
    <div className="">
      <WalletContextProvider>
        <AppBar />
        <h1>Hello world</h1>
      </WalletContextProvider>
    </div>
  );
}

export default Home;