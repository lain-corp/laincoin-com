// WalletConnect.tsx
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './WalletConnect.css';

const WalletConnect: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);
    }
  };

  return (
    <div className="wallet-connection">
      {address ? (
        <p className="wallet-status">🔓 Connected: <code>{address}</code></p>
      ) : (
        <button className="wallet-button" onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;