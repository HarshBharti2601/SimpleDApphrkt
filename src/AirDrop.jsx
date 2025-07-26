import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState } from "react";

export function RequestAirDrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    async function requestAirDrop() {
        if (!wallet.publicKey) {
            alert("Connect your wallet first!");
            return;
        }
        if (!amount || isNaN(amount) || +amount <= 0) {
            alert("Enter a valid amount.");
            return;
        }
        setLoading(true);
        try {
            await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
            alert(`Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
        } catch (e) {
            alert("Airdrop failed: " + e.message);
        }
        setLoading(false);
    }
    return (
        <div>
            <label>
              <img className="icon" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a7.svg" alt="" />
              Request Devnet Airdrop:
            </label>
            <input
                type="text"
                placeholder="Amount (e.g. 1)"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                disabled={loading}
            />
            <button onClick={requestAirDrop} disabled={loading}>
                {loading ? "Requesting..." : <>
                  <img className="icon" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a7.svg" alt="" /> Request Airdrop
                </>}
            </button>
        </div>
    );
}

export default RequestAirDrop;