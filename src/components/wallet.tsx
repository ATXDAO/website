import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useAccount, useConnect } from 'wagmi';

const shortenAddress = (addr: string): string =>
  `${addr.substring(0, 6)}...${addr.slice(addr.length - 4)}`;

export const Wallet: FC = () => {
  const [{ data, error }, connect] = useConnect();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true });

  return accountData ? (
    <Tooltip
      label={
        accountData.connector && `Connected to ${accountData.connector.name}`
      }
    >
      <HStack>
        {accountData?.ens?.avatar && (
          <Image src={accountData.ens?.avatar} alt="ENS Avatar" />
        )}
        <Box>
          {accountData.ens?.name
            ? accountData.ens.name
            : shortenAddress(accountData.address)}
        </Box>
        <Button size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </HStack>
    </Tooltip>
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
