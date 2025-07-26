import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction
} from "@solana/web3.js";
import React, { useState } from "react";

export function SendToken() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSend() {
        if (!wallet.publicKey) {
            alert("Connect your wallet first!");
            return;
        }
        if (!to || !amount || isNaN(amount) || +amount <= 0) {
            alert("Enter correct recipient and amount.");
            return;
        }
        setLoading(true);
        try {
            const transaction = new Transaction();
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(to),
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );

            await wallet.sendTransaction(transaction, connection);
            alert(`Sent ${amount} SOL to ${to}`);
        } catch (e) {
            alert("Transaction failed: " + e.message);
        }
        setLoading(false);
    }
    return (
        <div>
            <label>
              <img className="icon" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e4.svg" alt="" />
              Send SOL:
            </label>
            <input
                type="text"
                placeholder="Recipient address"
                value={to}
                onChange={e => setTo(e.target.value)}
                disabled={loading}
            />
            <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
                {loading ? "Sending..." : <>
                  <img className="icon" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e4.svg" alt="" />Send
                </>}
            </button>
        </div>
    );
}

export default SendToken;