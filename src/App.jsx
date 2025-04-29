import React from "react";
import './App.css';

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { Airdrop } from "./Airdrop";
import "@solana/wallet-adapter-react-ui/styles.css";
const wallets = [];

function App() {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 p-4">

            <div className="flex gap-4 mb-6">
              <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 !text-white !rounded-md !px-4 !py-2" />
              <WalletDisconnectButton className="!bg-red-500 hover:!bg-red-600 !text-white !rounded-md !px-4 !py-2" />
            </div>

            <Airdrop />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
