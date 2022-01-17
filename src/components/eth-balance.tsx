import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useBalance } from 'wagmi';

const ETHBalance: FC = () => {
  const [{ data }] = useBalance();

  return <Text>Balance: Ξ{data?.formatted}</Text>;
};

// eslint-disable-next-line import/no-default-export
export default ETHBalance;
