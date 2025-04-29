import { useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function Airdrop() {
  const { connection } = useConnection();
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(`Connected Wallet: ${wallet.publicKey.toString()}`);
    }
  }, [wallet.publicKey]);

  async function sendAirdropToUser() {
    if (!wallet.publicKey) {
      alert("No wallet connected!");
      return;
    }

    const amountInput = document.getElementById("amount");
    if (!amountInput) {
      alert("Amount input not found!");
      return;
    }

    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        amount * 1000000000
      );
      alert(`Airdrop successful! Signature: ${signature}`);
    } catch (error) {
      alert(`Airdrop failed: ${error.message}`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white text-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          ⚡ Solana Airdrop
        </h1>

        <div className="flex justify-center mb-6">
          <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 !text-white !rounded-md !px-4 !py-2" />
        </div>

        {wallet.publicKey && (
          <p className="text-sm break-words mb-4 text-gray-700">
            Connected Wallet:{" "}
            <span className="font-medium text-gray-900">
              {wallet.publicKey.toString()}
            </span>
          </p>
        )}

        <input
          id="amount"
          type="number"
          placeholder="Enter amount (SOL)"
          className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          onClick={sendAirdropToUser}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          🚀 Send Airdrop
        </button>
      </div>
    </div>
  );
}
