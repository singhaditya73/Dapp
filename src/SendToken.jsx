import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

export function SendSols() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");

    const sendTokens = async () => {
        if (!publicKey) {
            alert("Connect your wallet first!");
            return;
        }

        try {
            const toPubkey = new PublicKey(to);
            const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey,
                    lamports,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, "confirmed");

            alert(`✅ Sent ${amount} SOL to ${to}`);
        } catch (error) {
            console.error(error);
            alert("❌ Transaction failed. Check the console for details.");
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 mt-4">
            <input
                type="text"
                placeholder="To (Wallet Address)"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border px-2 py-1 rounded"
            />
            <input
                type="number"
                placeholder="Amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border px-2 py-1 rounded"
            />
            <button onClick={sendTokens} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Send
            </button>
        </div>
    );
}
