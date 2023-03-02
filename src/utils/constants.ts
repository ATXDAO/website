/* eslint-disable @typescript-eslint/no-var-requires */
import { BigNumber } from 'ethers';
import { Address } from 'wagmi';

/* eslint-disable global-require */
interface MerkleTreeData {
  root: string;
  proofs: Record<string, string[]>;
}

export type SupportedNetwork = 'ethereum' | 'ropsten' | 'rinkeby';

interface ContractData {
  blockExplorer: string;
  address: Address;
}

interface MintContractData extends ContractData {
  merkleTree: MerkleTreeData;
}

export type EventArgs = [
  from: string,
  to: string,
  tokenId: BigNumber,
  event: Event
];

export const mintContractByNetwork: Record<SupportedNetwork, MintContractData> =
  {
    ethereum: {
      blockExplorer: 'https://etherscan.io',
      address: '0x63f8F23ce0f3648097447622209E95A391c44b00',
      merkleTree: require('./zilker-merkle-tree.json') as MerkleTreeData,
    },
    ropsten: {
      blockExplorer: 'https://ropsten.etherscan.io',
      address: '0xc38d8da0c1ca6314474a3442103f543551f0f177',
      merkleTree: require('./ropsten-merkle-tree.json') as MerkleTreeData,
    },
    rinkeby: {
      blockExplorer: 'https://rinkeby.etherscan.io/',
      address: '0x683d067d5cA4158271A6c79BBaFDDb05a698D2b4',
      merkleTree: require('./ropsten-merkle-tree.json') as MerkleTreeData,
    },
  };

export const UKRAINE_ETH_ADDRESS = '0x165CD37b4C644C2921454429E7F9358d18A45e14';

export const ukraineContractByNetwork: Record<SupportedNetwork, ContractData> =
  {
    ethereum: {
      blockExplorer: 'https://etherscan.io',
      address: '0x9c30bac4D3ADdBa39693aA4caDAe14449D60f795',
    },
    ropsten: {
      blockExplorer: 'https://ropsten.etherscan.io',
      address: '0xa18C3780baCc84ad7585e31EeBCF998631B643cd',
    },
    rinkeby: {
      blockExplorer: 'https://rinkeby.etherscan.io/',
      address: '0x99390BE7cf40225ECEB7167CA9E3746eCf6D7e6e',
    },
  };
