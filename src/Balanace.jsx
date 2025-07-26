import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useEffect, useState } from "react";

export function ShowBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        async function fetchBalance() {
            if (wallet.publicKey) {
                const value = await connection.getBalance(wallet.publicKey);
                setBalance((value / LAMPORTS_PER_SOL).toFixed(4));
            }
        }
        fetchBalance();
        const interval = setInterval(fetchBalance, 5000);
        return () => clearInterval(interval);
    }, [wallet.publicKey, connection]);

    return (
        <div>
            <label>
              <img className="icon" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4b0.svg" alt="" />
              SOL Balance:
            </label>
            <div className="balance-value">
                {wallet.publicKey ? (balance !== null ? `${balance} SOL` : "Loading...") : "Connect wallet"}
            </div>
        </div>
    );
}

export default ShowBalance;