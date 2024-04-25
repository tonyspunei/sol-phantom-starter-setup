import { FC } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");

const SendSolForm: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const validateSolAddress = (address: string) => {
    try {
      let pubkey = new web3.PublicKey(address);
      let isSolana = web3.PublicKey.isOnCurve(pubkey.toBuffer());
      return isSolana;
    } catch (error) {
      return false;
    }
  };

  const sendSol = async (event) => {
    event.preventDefault();
    const amout = event.target.amount.value;
    const recipient = event.target.recipient.value;

    // Validate input
    if(!amout || !recipient) return;
    if(!validateSolAddress(recipient)) {
      console.error("Invalid Solana address");
      return;
    }
    if(!publicKey || !connection) return;

    try {
      const sendTo = new web3.PublicKey(recipient);
      const transaction = new web3.Transaction();

      const instruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: sendTo,
        lamports: web3.LAMPORTS_PER_SOL * parseFloat(amout),
      });
      transaction.add(instruction);
      
      const signature = await sendTransaction(transaction, connection);

      console.log(`✅ Transaction sent: https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    } catch (error) {
      console.error("Error sending SOL: ", error);
    }
  }

  return (
    <>
      <form onSubmit={sendSol} className="flex flex-col max-w-4xl w-full text-center space-y-10">
        <div className="flex flex-col space-y-2.5">
          <label htmlFor="amount" className="text-3xl">Amout (in SOL) to send:</label>
          <input id="amount" type="text" className="py-2.5 px-3 text-black" placeholder="e.g. 0.1" required />
        </div>
        <div className="flex flex-col space-y-2.5">
          <label htmlFor="recipient" className="text-3xl">Send SOL to:</label>
          <input id="recipient" type="text" className="py-2.5 px-3 text-black" pattern="^[1-9A-HJ-NP-Za-km-z]{32,44}$"  placeholder="e.g. 8qSkG63YFrvL6mCjdMmmABv2Qrtx8kfbJx132YNNM9bm" required />
        </div>
        <button type="submit" className="py-3 px-8 bg-white text-black w-fit mx-auto text-lg">Send</button>
      </form>
    </>
  );
};

export default SendSolForm;