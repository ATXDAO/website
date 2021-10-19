/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ERC20_ABI from '../contracts/ERC20.json';
import type { ERC20 } from '../contracts/types';
import useContract from './useContract';

export default function useTokenContract(tokenAddress: string) {
  return useContract<ERC20>(tokenAddress, ERC20_ABI);
}
