import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_ID as string;

const walletConnectProjectId = process.env
  .NEXT_WALLETCONNECT_PROJECT_ID as string;

const supportedChains = [mainnet];

export const { wallets, connectors } = getDefaultWallets({
  appName: 'ATX DAO',
  projectId: walletConnectProjectId,
  chains: supportedChains,
});

export const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  supportedChains,
  [
    alchemyProvider({ apiKey: alchemyApiKey }),
    infuraProvider({ apiKey: infuraApiKey }),
    publicProvider(),
  ]
);
