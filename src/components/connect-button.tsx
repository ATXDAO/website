// import {
//   Box,
//   Button,
//   ButtonProps,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Stack,
//   useDisclosure,
// } from '@chakra-ui/react';
import { FC } from 'react';
// import { useConnect } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';

export const ConnectButton: FC = () => <RainbowConnectButton />;

// export const ConnectButton: FC<ButtonProps> = (buttonProps) => {
//   const { connect, error, connectors } = useConnect();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const { children } = buttonProps;

//   return (
//     <>
//       <Button onClick={onOpen} {...buttonProps}>
//         {children}
//       </Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Connect</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Stack>
//               {connectors &&
//                 connectors.map((x) => (
//                   <Button
//                     disabled={!x.ready}
//                     key={x.id}
//                     onClick={() => connect({ connector: x })}
//                   >
//                     {x.name}
//                     {!x.ready && ' (unsupported)'}
//                   </Button>
//                 ))}
//               {error && <Box>{error?.message ?? 'Failed to connect'}</Box>}
//             </Stack>
//           </ModalBody>
//           <ModalFooter />
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
