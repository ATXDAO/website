/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import { getAddress } from 'viem';

interface MerkleTreeData {
  root: string;
  addressData: Record<
    string,
    { tokenURI: string; isNewMember: boolean; proof: string[] }
  >;
}

export type SupportedNetwork = 'ethereum' | 'sepolia';
export type AddressStr = `0x${string}`;

interface ContractData {
  address: AddressStr;
}

export interface MinterData {
  address: AddressStr;
  tokenURI: string;
  isNewMinter: boolean;
}

export interface MintContractData extends ContractData {
  merkleTree: MerkleTreeData;
}

export type EventArgs = [
  from: AddressStr,
  to: AddressStr,
  tokenId: bigint,
  event: Event,
];

export const ATXDAOMINTER_ABI = require('../contracts/ATXDAOMinter.json');
export const ATXDAONFT_V2_ABI = require('../contracts/ATXDAONFT_V2.json');

export const mintContractByNetwork: Record<SupportedNetwork, MintContractData> =
  {
    ethereum: {
      address: getAddress('0xf4c9a61D56B7645bE89ecA17CE6BAcB3F164b2F1'),
      merkleTree: require('./bluebonnet-merkle-tree') as MerkleTreeData,
    },
    sepolia: {
      address: getAddress('0x0688F217A56623DeB137d7ca674ab2b2dF884999'),
      merkleTree: require('./bluebonnet-merkle-tree') as MerkleTreeData,
    },
  };

export const nftContractByNetwork: Record<SupportedNetwork, ContractData> = {
  ethereum: {
    address: getAddress('0x63f8F23ce0f3648097447622209E95A391c44b00'),
  },
  sepolia: {
    address: getAddress('0x6d22c11f7fA3f67174Eec9eBc8bFf129978BE90d'),
  },
};
