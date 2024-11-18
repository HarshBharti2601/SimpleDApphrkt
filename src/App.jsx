import './App.css';
import React,{useMemo} from "react";
import{
  ConnectionProvider,WalletProvider
} from "@solana/wallet-adapter-react";
import{WalletAdapterNetwork} from "@solana/wallet-adapter-base";

import{
  WalletModalProvider,WalletDisconnectButton,WalletMultiButton
} from "@solana/wallet-adapter-react-ui";

import {clusterApiUrl} from "@solana/web3.js";
import"@solana/wallet-adapter-react-ui/styles.css";
import RequestAirDrop from './AirDrop';
import ShowBalance from './Balanace';
import SendToken from './Transaction';
import SignMessage from './SignMessage';

function App(){

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(()=>clusterApiUrl(network),[network]);
  return(
    <>
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets = {[]} autoConnect>
        <WalletModalProvider>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <WalletMultiButton/>
            <WalletDisconnectButton/>
          </div>
          <RequestAirDrop/>
          <ShowBalance/>
          <SendToken/>
          <SignMessage/>
        </WalletModalProvider>
      </WalletProvider>

    </ConnectionProvider>

    </>
    
  )
}

export default App;