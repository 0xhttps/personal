import React, { createContext, useContext, useEffect, useState } from 'react';
import onboard from './web3onboard';

interface Web3OnboardContextProps {
  connect: () => Promise<void>;
  disconnect: () => void;
  connectedWallet: any;
}

const Web3OnboardContext = createContext<Web3OnboardContextProps>({
  connect: async () => {},
  disconnect: () => {},
  connectedWallet: null
});

export const Web3OnboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connectedWallet, setConnectedWallet] = useState<any>(null);

  useEffect(() => {
    const previouslyConnectedWallets = onboard.state.get().wallets;
    if (previouslyConnectedWallets.length > 0) {
      setConnectedWallet(previouslyConnectedWallets[0]);
    }
  }, []);

  const connect = async () => {
    const wallets = await onboard.connectWallet();
    if (wallets.length > 0) {
      setConnectedWallet(wallets[0]);
    }
  };

  const disconnect = () => {
    if (connectedWallet) {
      onboard.disconnectWallet({ label: connectedWallet.label });
      setConnectedWallet(null);
    }
  };

  return (
    <Web3OnboardContext.Provider value={{ connect, disconnect, connectedWallet }}>
      {children}
    </Web3OnboardContext.Provider>
  );
};

export const useWeb3Onboard = () => useContext(Web3OnboardContext);
