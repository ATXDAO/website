import {
  Box,
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useConnect } from 'wagmi';

export const ConnectButton: FC<ButtonProps> = (buttonProps) => {
  const { connect, error, connectors } = useConnect();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { children } = buttonProps;

  return (
    <>
      <Button onClick={onOpen} {...buttonProps}>
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {connectors?.map((connector) => (
                <Button
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                  {!connector.ready && ' (unsupported)'}
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
