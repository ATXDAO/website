import { TriangleDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useAccount, useConnect, useNetwork, useProvider } from 'wagmi';

const shortenAddress = (addr: string): string =>
  `${addr.substring(0, 6)}...${addr.slice(addr.length - 4)}`;

export const Wallet: FC = () => {
  const [{ data, error }, connect] = useConnect();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <TriangleDownIcon ml={3} mr={-1} w={3} h3={4} color="gray.400" />
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
    <>
      <Button onClick={onOpen}>Connect</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {data.connectors.map((x) => (
                <Button
                  disabled={!x.ready}
                  key={x.id}
                  onClick={() => connect(x)}
                >
                  {x.name}
                  {!x.ready && ' (unsupported)'}
                </Button>
              ))}
              {error && <Box>{error?.message ?? 'Failed to connect'}</Box>}
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
