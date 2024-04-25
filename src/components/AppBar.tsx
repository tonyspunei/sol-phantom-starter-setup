'use client';
import { FC } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import SolanaLogo from "@/assets/solana-sol-logo.png"

const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton), { ssr: false });

export const AppBar: FC = () => {
  console.log(WalletMultiButton)
  return (
    <div className="flex items-center justify-between bg-black py-5 px-10 w-full">
      <Image src={SolanaLogo} alt="Solana Logo" className="h-10 w-10" width={50} height={50} />
      <h1 className="text-5xl font-bold">Solana Phantom Setup</h1>
      <WalletMultiButton /> 
    </div>
  )
}