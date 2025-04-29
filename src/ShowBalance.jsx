import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const ShowSol = () => {
    const {connection} = useConnection();
    const {publicKey} = useWallet();
    const [balance, setbalance] = useState(null)

    useEffect(()=>{
        const getBalance = async () => {
            if(publicKey){
                const lamports = await connection.getBalance(publicKey);
                setbalance(lamports/LAMPORTS_PER_SOL)
            }
        } 
        getBalance();  

    },[connection, publicKey]);

    return (
        <div>
            <p>SOL Balance:</p>
            <div>{balance !== null ? `${balance.toFixed(4)} SOL` : "Loading..."}</div>
        </div>
    );
}

export default ShowSol;

    

    