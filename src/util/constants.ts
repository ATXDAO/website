/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
interface MerkleTreeData {
  root: string;
  proofs: Record<string, string[]>;
}

export type SupportedNetwork = 'mainnet' | 'ropsten';

interface ContractData {
  blockExplorer: string;
  address: string;
  merkleTree: MerkleTreeData;
}

export const contractsByNetwork: Record<SupportedNetwork, ContractData> = {
  mainnet: {
    blockExplorer: 'https://etherscan.io',
    address: '0x63f8F23ce0f3648097447622209E95A391c44b00',
    merkleTree: require('./zilker-merkle-tree.json') as MerkleTreeData,
  },
  ropsten: {
    blockExplorer: 'https://ropsten.etherscan.io',
    address: '0xc38d8da0c1ca6314474a3442103f543551f0f177',
    merkleTree: require('./ropsten-merkle-tree.json') as MerkleTreeData,
  },
};
