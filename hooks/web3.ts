/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Contract, ContractInterface } from '@ethersproject/contracts';
import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import ERC20_ABI from 'contracts/ERC20.json';
import MINT_ABI from 'contracts/mint.json';
import { ERC20, Mint } from 'contracts/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';

function getBlockNumber(library: Web3Provider) {
  return async () => {
    return library.getBlockNumber();
  };
}

export function useKeepSWRDataLiveAsBlocksArrive(
  mutate: () => Promise<unknown>
) {
  // because we don't care about the referential identity of mutate, just bind it to a ref
  const mutateRef = useRef(mutate);

  useEffect(() => {
    mutateRef.current = mutate;
  });

  // then, whenever a new block arrives, trigger a mutation
  const { data } = useBlockNumber();

  useEffect(() => {
    mutateRef.current();
  }, [data]);
}

export function useBlockNumber() {
  const { library } = useWeb3React<Web3Provider>();
  const shouldFetch = !!library;

  if (!library) throw Error('web3 library undefined');

  return useSWR(shouldFetch ? ['BlockNumber'] : null, getBlockNumber(library), {
    refreshInterval: 10 * 1000,
  });
}

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useENSName(address: string) {
  const { library, chainId } = useWeb3React<Web3Provider>();
  const [ENSName, setENSName] = useState('');

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (library && typeof address === 'string') {
      let stale = false;

      library
        .lookupAddress(address)
        .then((name) => {
          if (!stale && typeof name === 'string') {
            setENSName(name);
          }
        })
        .catch(() => {});

      return () => {
        stale = true;
        setENSName('');
      };
    }
  }, [library, address, chainId]);

  return ENSName;
}

function getETHBalance(library: Web3Provider) {
  return async (_: string, address: string) => {
    const balance = await library.getBalance(address);

    return balance;
  };
}

export function useETHBalance(address: string, suspense = false) {
  const { library, chainId } = useWeb3React();

  const shouldFetch = typeof address === 'string' && !!library;

  const result = useSWR(
    shouldFetch ? ['ETHBalance', address, chainId] : null,
    getETHBalance(library),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}

export function useContract<T extends Contract = Contract>(
  address: string,
  ABI: ContractInterface
): T | null {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library || !chainId) {
      return null;
    }

    try {
      return new Contract(address, ABI, library.getSigner(account));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed To Get Contract', error);

      return null;
    }
  }, [address, ABI, library, account]) as T;
}

export function useTokenContract(tokenAddress: string) {
  return useContract<ERC20>(tokenAddress, ERC20_ABI);
}

function getTokenBalance(contract: ERC20) {
  return async (_: string, address: string) => {
    const balance = await contract.balanceOf(address);

    return balance;
  };
}

export function useTokenBalance(
  address: string,
  tokenAddress: string,
  suspense = false
) {
  const contract = useTokenContract(tokenAddress);

  const shouldFetch =
    typeof address === 'string' &&
    typeof tokenAddress === 'string' &&
    !!contract;

  if (!contract) throw Error('contract not found');

  const result = useSWR(
    shouldFetch ? ['TokenBalance', address, tokenAddress] : null,
    getTokenBalance(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}

export function useMintContract(tokenAddress?: string) {
  return useContract<Mint>(tokenAddress || '', MINT_ABI);
}
