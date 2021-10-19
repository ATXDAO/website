import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { FC } from 'react';
import useETHBalance from '../hooks/useETHBalance';
import { parseBalance } from '../util';

const ETHBalance: FC = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useETHBalance(account || '');

  return <p>Balance: Ξ{parseBalance(data ?? 0)}</p>;
};

// eslint-disable-next-line import/no-default-export
export default ETHBalance;
