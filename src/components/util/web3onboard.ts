import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1', // Mainnet chain ID
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/9fbff480374b43c79b9cd94c5dc348db' // Replace with your Infura project ID
    }
  ]
});

export default onboard;

