import ATXDAONFT_V2_ABI from '../contracts/ATXDAONFT_V2.json';
import { mintContractByNetwork } from './constants';
import { getContract } from '@wagmi/core';
import { ATXDAONFT_V2 } from 'contracts/types';
import { providers } from 'ethers';
import { SiweMessage } from 'siwe';

export async function addressHasToken(address: string): Promise<boolean> {
  const provider = new providers.AlchemyProvider(
    undefined,
    process.env.NEXT_PUBLIC_ALCHEMY_ID
  );

  const nft = getContract<ATXDAONFT_V2>({
    addressOrName: mintContractByNetwork.ethereum.address,
    contractInterface: ATXDAONFT_V2_ABI,
    signerOrProvider: provider,
  });

  return (await nft.balanceOf(address)).gt(0);
}

type AuthResponse =
  | { valid: true; nftOwner: boolean; siwe: SiweMessage }
  | { valid: false; errorMessage: string };

export async function authUser(siwe?: SiweMessage): Promise<AuthResponse> {
  if (!siwe) {
    return { valid: false, errorMessage: 'Not logged in' };
  }
  const { expirationTime, address } = siwe;
  if (!expirationTime || Date.parse(expirationTime) < Date.now()) {
    return { valid: false, errorMessage: 'Session expired' };
  }
  return { valid: true, nftOwner: await addressHasToken(address), siwe };
}
