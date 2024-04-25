"use client";
import { NextPage } from "next";
import WalletContextProvider from "@/components/WalletContextProvider";
import { AppBar } from "@/components/AppBar";
import SendSolForm from "@/components/SendSolForm";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Home: NextPage = (props) => {
  const [balance, setBalance] = useState<number>(0);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const getBalance = async () => {
      if(connection && publicKey) {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL)
      }
    } 
    getBalance();
  }, [publicKey, connection])

  return (
    <div className="">
      <AppBar />
      <div className="w-full flex flex-col items-center mt-40 space-y-10">
        <h2 className="text-5xl">
          Balance:
          <span className="text-red-500"> {balance} </span>
          <span className="text-base">SOL</span>
        </h2>
        <SendSolForm />
      </div>
    </div>
  );
}

export default Home;