import './App.css';
import React, { useMemo } from "react";
import {
  ConnectionProvider, WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider, WalletDisconnectButton, WalletMultiButton
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import RequestAirDrop from './AirDrop';
import ShowBalance from './Balanace';
import SendToken from './Transaction';
import SignMessage from './SignMessage';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <>
      <div className="bg-illustration" />
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="app-container">
              <div className="header">
                <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=026" alt="Solana" width="54" style={{marginBottom:12, filter:'drop-shadow(0 0 10px #7fdbff)'}} />
                <h1>🔗 Simple Solana DApp</h1>
                <div style={{ marginTop: 10 }}>
                  <WalletMultiButton style={{ marginRight: 12 }} />
                  <WalletDisconnectButton />
                </div>
              </div>
              <div className="section">
                <ShowBalance />
              </div>
              <div className="section">
                <RequestAirDrop />
              </div>
              <div className="section">
                <SendToken />
              </div>
              <div className="section">
                <SignMessage />
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;