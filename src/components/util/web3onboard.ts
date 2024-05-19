import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

const injected = injectedModule();

const key = import.meta.env.INFURA_API_KEY;

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1', // Mainnet chain ID
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: `https://mainnet.infura.io/v3/${key}` // Replace with your Infura project ID
    }
  ]
});

export default onboard;

