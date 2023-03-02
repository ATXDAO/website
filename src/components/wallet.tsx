import { shortenAddress } from '../utils';
import { ConnectButton } from './connect-button';
import { TriangleDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Badge,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useIsMounted, useUser } from 'hooks/app-hooks';
import { FC } from 'react';
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';

export const Wallet: FC = () => {
  const { address: accountAddress } = useAccount();
  const { data: ensName } = useEnsName();
  const { data: ensAvatar } = useEnsAvatar();
  const { disconnect } = useDisconnect();
  const [, setUser] = useUser();

  const signOut: () => void = async () => {
    disconnect();
    await fetch('/api/logout');
    setUser(() => null);
  };

  const { chain: activeChain } = useNetwork();
  const activeChainId = activeChain?.id;

  const {
    switchNetwork,
    chains,
    pendingChainId,
    isLoading: networkIsLoading,
  } = useSwitchNetwork();
  const isMounted = useIsMounted();

  return isMounted && accountAddress ? (
    <Menu>
      <MenuButton
        as={Button}
        backgroundColor="rgba(0,0,0,0)"
        rounded="full"
        pl={4}
      >
        <HStack mx={-1} spacing={1}>
          <Text fontSize={['md', 'lg']} mr={1}>
            {ensName || shortenAddress(accountAddress)}
          </Text>
          <Avatar fontWeight="700" size="sm" src={ensAvatar || undefined}>
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <TriangleDownIcon ml={3} mr={-1} w={3} color="gray.400" />
        </HStack>
      </MenuButton>
      <MenuGroup />
      <MenuList>
        <MenuGroup title="Network">
          {chains?.map((chain) => (
            <MenuItem
              key={`network-${chain.id}`}
              onClick={() =>
                activeChainId !== chain.id && switchNetwork?.(chain.id)
              }
            >
              <Text pl="3">
                {chain.name}
                <Badge
                  variant="outline"
                  colorScheme="green"
                  ml={2}
                  hidden={activeChainId !== chain.id}
                >
                  Connected
                </Badge>
                <Badge
                  variant="outline"
                  colorScheme="yellow"
                  ml={2}
                  hidden={!networkIsLoading || pendingChainId !== chain.id}
                >
                  Loading...
                </Badge>
              </Text>
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={() => signOut()}>Disconnect</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <ConnectButton>Connect</ConnectButton>
  );
};
