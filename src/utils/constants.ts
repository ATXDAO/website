/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import { getAddress } from 'viem';

interface MerkleTreeData {
  root: string;
  proofs: Record<string, string[]>;
}

export type SupportedNetwork = 'ethereum';
export type AddressStr = `0x${string}`;

interface ContractData {
  blockExplorer: string;
  address: AddressStr;
}

export interface MinterData {
  address: AddressStr;
  tokenURI: string;
  isNewMinter: boolean;
}

export interface MintContractData extends ContractData {
  merkleTree: MerkleTreeData;
  minterMap: Record<string, MinterData>;
}

export type EventArgs = [
  from: AddressStr,
  to: AddressStr,
  tokenId: bigint,
  event: Event,
];

export const ATXDAOMINTER_ABI = require('../contracts/ATXDAOMinter.json');
export const ATXDAONFT_V2_ABI = require('../contracts/ATXDAONFT_V2.json');

export const testMinterMap: Record<string, MinterData> = {};
(require('./test-bluebonnet-list.json') as MinterData[]).forEach((minter) => {
  testMinterMap[minter.address] = minter;
});

export const minterMap: Record<string, MinterData> = {};
(require('./bluebonnet-list.json') as MinterData[]).forEach((minter) => {
  minterMap[minter.address] = minter;
});

export const mintContractByNetwork: Record<SupportedNetwork, MintContractData> =
  {
    ethereum: {
      blockExplorer: 'https://etherscan.io',
      address: getAddress('0xf4c9a61D56B7645bE89ecA17CE6BAcB3F164b2F1'),
      merkleTree: require('./bluebonnet-merkle-tree') as MerkleTreeData,
      minterMap,
    },
    // localhost: {
    //   blockExplorer: 'https://etherscan.io',
    //   address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
    //   merkleTree:
    //     require('./test-bluebonnet-merkle-tree.json') as MerkleTreeData,
    //   minterMap: testMinterMap,
    // },
  };

export const nftContractByNetwork: Record<SupportedNetwork, ContractData> = {
  ethereum: {
    blockExplorer: 'https://etherscan.io',
    address: getAddress('0x63f8F23ce0f3648097447622209E95A391c44b00'),
  },
};
