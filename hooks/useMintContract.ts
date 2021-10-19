/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import MINT_ABI from '../contracts/mint.json';
import { Mint } from '../contracts/types';
import useContract from './useContract';

export default function useMintContract(tokenAddress?: string) {
  return useContract<Mint>(tokenAddress || '', MINT_ABI);
}
