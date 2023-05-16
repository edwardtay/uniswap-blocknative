import { useState, useEffect } from 'react';

import { SwapWidget } from '@uniswap/widgets';

import '@uniswap/widgets/fonts.css';

import { ethers } from 'ethers';
import { useConnectWallet } from '@web3-onboard/react';

import { JSON_RPC_URL } from '../constants';
import styles from '../styles/Home.module.css';

const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org';
const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

export default function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'));
    } else {
      setProvider(undefined);
    }
  }, [wallet]);

  // The connect wallet function which will be based to the Uniswap component below.
  const connectWallet = () => {
    connect();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Uniswap Swap Widget</h1>

        <div className={styles.demo}>
          <div className={styles.widget}>
            <SwapWidget
              jsonRpcEndpoint={JSON_RPC_URL}
              tokenList={TOKEN_LIST}
              provider={provider}
              // When the Uniswap connect wallet button gets hit
              // the function gets called. We'll hook this up to
              // our connect wallet method from web3-onboard.
              onConnectWallet={connectWallet}
              defaultInputTokenAddress="NATIVE"
              defaultInputAmount="1"
              defaultOutputTokenAddress={UNI}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
