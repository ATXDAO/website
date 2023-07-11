/* eslint-disable @typescript-eslint/no-var-requires */
import { BigNumber } from 'ethers';

/* eslint-disable global-require */
interface MerkleTreeData {
  root: string;
  proofs: Record<string, string[]>;
}

export type SupportedNetwork = 'ethereum' | 'localhost';

interface ContractData {
  blockExplorer: string;
  address: string;
}

export interface MinterData {
  address: string;
  tokenURI: string;
  isNewMinter: boolean;
}

export interface MintContractData extends ContractData {
  merkleTree: MerkleTreeData;
  minterMap: Record<string, MinterData>;
}

export type EventArgs = [
  from: string,
  to: string,
  tokenId: BigNumber,
  event: Event
];

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
      address: '0xf4c9a61D56B7645bE89ecA17CE6BAcB3F164b2F1',
      merkleTree: require('./bluebonnet-merkle-tree') as MerkleTreeData,
      minterMap,
    },
    localhost: {
      blockExplorer: 'https://etherscan.io',
      address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
      merkleTree:
        require('./test-bluebonnet-merkle-tree.json') as MerkleTreeData,
      minterMap: testMinterMap,
    },
  };
