import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useETHBalance } from 'hooks/web3';
import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { parseBalance } from '../util';

const ETHBalance: FC = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useETHBalance(account || '');

  return <Text>Balance: Ξ{parseBalance(data ?? 0)}</Text>;
};

// eslint-disable-next-line import/no-default-export
export default ETHBalance;
