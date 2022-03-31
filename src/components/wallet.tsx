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
import { FC, useEffect, useState } from 'react';
import { useAccount, useNetwork, useProvider } from 'wagmi';

export const Wallet: FC = () => {
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true });

  const provider = useProvider();
  const [providerAvatar, setProviderAvatar] = useState<string | null>();

  useEffect(() => {
    if (!accountData) return;
    provider
      .getAvatar(accountData?.address)
      .then((_avatar) => setProviderAvatar(_avatar));
  }, [accountData?.address]);

  const [{ data: networkData }, switchNetwork] = useNetwork();

  const avatar = accountData?.ens?.avatar || providerAvatar || undefined;

  return accountData ? (
    <Menu>
      <MenuButton
        as={Button}
        backgroundColor="rgba(0,0,0,0)"
        rounded="full"
        pl={4}
      >
        <HStack mx={-1} spacing={1}>
          <Text fontSize={['md', 'lg']} mr={1}>
            {accountData.ens?.name
              ? accountData.ens.name
              : shortenAddress(accountData.address)}
          </Text>
          <Avatar fontWeight="700" size="sm" src={avatar}>
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <TriangleDownIcon ml={3} mr={-1} w={3} color="gray.400" />
        </HStack>
      </MenuButton>
      <MenuGroup />
      <MenuList>
        <MenuGroup title="Network">
          {networkData &&
            networkData.chains.map((chain) => (
              <MenuItem
                key={chain.id}
                onClick={
                  networkData.chain?.id !== chain.id
                    ? switchNetwork &&
                      (() =>
                        switchNetwork(chain.id).then(() =>
                          window.location.reload()
                        ))
                    : undefined
                }
              >
                <Text pl="3">
                  {chain.name}
                  <Badge
                    variant="outline"
                    colorScheme="green"
                    ml={2}
                    hidden={networkData.chain?.id !== chain.id}
                  >
                    Connected
                  </Badge>
                </Text>
              </MenuItem>
            ))}
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={disconnect}>Disconnect</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <ConnectButton>Connect</ConnectButton>
  );
};
