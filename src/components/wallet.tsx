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
import { useIsMounted } from 'hooks/app-hooks';
import { FC } from 'react';
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
} from 'wagmi';

export const Wallet: FC = () => {
  const { data: accountData } = useAccount();
  const { data: ensName } = useEnsName();
  const { data: ensAvatar } = useEnsAvatar();
  const { disconnect } = useDisconnect();

  const signOut: () => void = async () => {
    disconnect();
    await fetch('/api/logout');
  };

  const {
    switchNetwork,
    chains,
    activeChain,
    pendingChainId,
    isLoading: networkIsLoading,
  } = useNetwork();
  const isMounted = useIsMounted();

  return isMounted && accountData?.address ? (
    <Menu>
      <MenuButton
        as={Button}
        backgroundColor="rgba(0,0,0,0)"
        rounded="full"
        pl={4}
      >
        <HStack mx={-1} spacing={1}>
          <Text fontSize={['md', 'lg']} mr={1}>
            {ensName || shortenAddress(accountData.address)}
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
          {chains &&
            chains.map((chain) => (
              <MenuItem
                key={`network-${chain.id}`}
                onClick={() =>
                  activeChain?.id !== chain.id && switchNetwork?.(chain.id)
                }
              >
                <Text pl="3">
                  {chain.name}
                  <Badge
                    variant="outline"
                    colorScheme="green"
                    ml={2}
                    hidden={activeChain?.id !== chain.id}
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
