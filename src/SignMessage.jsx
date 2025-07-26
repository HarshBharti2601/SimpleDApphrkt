import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React, { useState } from "react";

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        if (!publicKey) {
            alert("Wallet not connected!");
            return;
        }
        if (!signMessage) {
            alert("Wallet does not support message signing!");
            return;
        }
        if (!message) {
            alert("Enter a message.");
            return;
        }
        setLoading(true);
        try {
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodedMessage);

            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
                alert("Message signature invalid!");
                return;
            }
            alert(`Message signature: ${bs58.encode(signature)}`);
        } catch (e) {
            alert("Failed to sign: " + e.message);
        }
        setLoading(false);
    };

    return (
        <div>
            <label>
              <img className="icon" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270d.svg" alt="" />
              Sign Message:
            </label>
            <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={loading}
            />
            <button onClick={onClick} disabled={loading}>
                {loading ? "Signing..." : <>
                  <img className="icon" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270d.svg" alt="" />Sign Message
                </>}
            </button>
        </div>
    );
}
export default SignMessage;