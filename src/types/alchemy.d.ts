export interface Contract {
  address: string;
}

export interface OpenSea {
  collectionName: string;
  safelistRequestStatus: string;
  imageUrl: string;
  description: string;
  externalUrl: string;
  twitterUsername: string;
  discordUrl: string;
  lastIngestedAt: Date;
}

export interface ContractMetadata {
  name: string;
  symbol: string;
  tokenType: string;
  contractDeployer: string;
  deployedBlockNumber: number;
  openSea: OpenSea;
}

export interface TokenMetadata {
  tokenType: string;
}
export interface ID {
  tokenId: string;
  tokenMetadata: TokenMetadata;
}

export interface Media {
  gateway: string;
  thumbnail: string;
  raw: string;
  format: string;
  bytes: number;
}
export interface Attribute {
  value: string;
  trait_type: string;
}

export interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}

export interface TokenURI {
  gateway: string;
  raw: string;
}

export interface OwnedNftElement {
  contract: Contract;
  id: ID;
  balance: string;
  title: string;
  description: string;
  tokenUri: TokenURI;
  media: Media[];
  metadata: Metadata;
  timeLastUpdated: Date;
  contractMetadata: ContractMetadata;
}

export interface OwnedNft {
  ownedNfts: OwnedNftElement[];
  totalCount: number;
  blockHash: string;
}
