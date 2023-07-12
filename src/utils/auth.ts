import { nftContractByNetwork, ATXDAONFT_V2_ABI } from './constants';
import { mainnetClient } from './clients';
import { getContract } from '@wagmi/core';
import { SiweMessage } from 'siwe';

export async function addressHasToken(address: string): Promise<boolean> {
  const nftContract = getContract({
    address: nftContractByNetwork.ethereum.address,
    abi: ATXDAONFT_V2_ABI,
    walletClient: mainnetClient,
  });

  const [balance] = (await nftContract.read.balanceOf([address])) as [bigint];

  return balance > 0n;
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
