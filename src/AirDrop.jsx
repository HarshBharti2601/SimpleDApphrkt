import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";


export function RequestAirDrop() {
    const wallet = useWallet();

    const { connection } = useConnection();

    async function requestAirDrop() {
        console.log("hii");
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(
            wallet.publicKey, amount * LAMPORTS_PER_SOL
        );
        alert("AirDropped" + amount + "SOL to" + wallet.publicKey.toBase58());
    }
    return (
        <div>
            <br />
            <br />
            <input id="amount" type="text" placeholder="Amount" />
            <button onClick={
                requestAirDrop
            }>
                Request Airdrop
            </button>
        </div>
    );

}

export default RequestAirDrop;