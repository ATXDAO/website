/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
interface MerkleTreeData {
  root: string;
  proofs: Record<string, string[]>;
}

type SupportedNetworkId = 1 | 3;

interface ContractData {
  address: string;
  merkleTree: MerkleTreeData;
}

export const contractData: Record<SupportedNetworkId, ContractData> = {
  1: {
    address: 'XXX',
    merkleTree: require('./zilker-merkle-tree.json') as MerkleTreeData,
  },
  3: {
    address: '0xc38d8da0c1ca6314474a3442103f543551f0f177',
    merkleTree: require('./ropsten-merkle-tree.json') as MerkleTreeData,
  },
};
