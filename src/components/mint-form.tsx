/* eslint-disable no-console */
// eslint-disable react/function-component-definition
import { PfpImage } from './pfp-image';
import { LinkIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  Button,
  Center,
  Code,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Stack,
  Text,
} from '@chakra-ui/react';
import { formatEther } from 'viem';
import { useFireworks } from 'hooks/app-hooks';
import { FC, useEffect, useState } from 'react';
import {
  mintContractByNetwork, // EventArgs,
  SupportedNetwork,
  ATXDAOMINTER_ABI,
} from 'utils/constants';
import {
  useAccount,
  useBalance,
  useNetwork,
  useWalletClient,
  useContractRead,
  useContractWrite,
} from 'wagmi';

const tryParseError = (errorMsg: string): string => {
  const requireRevertError = errorMsg.match(
    /execution reverted: ([^"]+)"/
  )?.[1];
  if (requireRevertError) {
    return requireRevertError;
  }
  if (errorMsg.match(/err: (insufficient funds)/)?.[1]) {
    return 'insufficient funds for price + gas';
  }
  return errorMsg;
};

const MintForm: FC = () => {
  const { chain } = useNetwork();
  const [, setFireworks] = useFireworks();
  const { address } = useAccount();

  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<'unsubmitted' | 'error' | 'success'>(
    'unsubmitted'
  );
  const {
    // data: signer,
    error: signerError,
    isLoading: signerLoading,
  } = useWalletClient();
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address,
    enabled: !!address,
  });

  const [isMinting, setIsMinting] = useState(false);
  const [buttonText, setButtonText] = useState('Loading...');

  const networkName = chain?.name?.toLowerCase() as SupportedNetwork;
  const { address: contractAddress, merkleTree } =
    mintContractByNetwork[networkName];

  const blockExplorer =
    chain?.blockExplorers?.etherscan || 'https://etherscan.io';

  const addressData =
    merkleTree.addressData[address?.toLowerCase() || ''] || {};

  const { proof, isNewMember, tokenURI } = addressData;

  useEffect(() => {
    console.log({ chain, address, proof, isNewMember, tokenURI });
  }, [chain, address, tokenURI]);

  const { data: mintPriceData, isLoading: isMintPriceLoading } =
    useContractRead({
      abi: ATXDAOMINTER_ABI,
      address: contractAddress,
      functionName: 'price',
      cacheTime: 600000, // 10 minutes
    });
  const mintPrice = mintPriceData as bigint | undefined;

  const { data: isMintableData, isLoading: isMintableLoading } =
    useContractRead({
      abi: ATXDAOMINTER_ABI,
      address: contractAddress,
      functionName: 'isMintable',
      cacheTime: 600000, // 10 minutes
    });
  const isMintable = isMintableData as boolean | undefined;

  const { data: hasMintedData } = useContractRead({
    abi: ATXDAOMINTER_ABI,
    address: contractAddress,
    functionName: 'hasMinted',
    args: [address],
    cacheOnBlock: true, // 10 minutes
  });
  const hasMinted = hasMintedData as boolean | undefined;

  function mintSuccess(): void {
    console.log('your nft was minted!!');
    setButtonText('Minted!');
    setIsMinting(false);
    setStatus('success');
    setFireworks(true);
  }

  function mintFailure(error: Error): void {
    setStatus('error');
    setIsMinting(false);
    setErrorMessage(tryParseError(error.message));
  }

  const { data: mintTransaction, write: mintNft } = useContractWrite({
    abi: ATXDAOMINTER_ABI,
    address: contractAddress,
    functionName: 'mint',
    args: [proof, tokenURI],
    value: mintPrice,
    onSuccess(data, variables, context) {
      console.log('minted', { data, variables, context });
      mintSuccess();
    },
    onError(error, variables, context) {
      console.log('error minting!', { error, variables, context });
      mintFailure(error);
    },
  });

  // trade-in logic
  // const [tradeInTokenId, setTradeInTokenId] = useState<bigint | undefined>();
  // const { data: tradeInTransaction, write: tradeInNft } = useContractWrite({
  //   abi: ATXDAOMINTER_ABI,
  //   address: contractAddress,
  //   functionName: 'tradeIn',
  //   args: [proof, tokenURI, tradeInTokenId],
  //   value: mintPrice,
  //   onSuccess(data, variables, context) {
  //     console.log('minted', { data, variables, context });
  //     mintSuccess();
  //   },
  //   onError(error, variables, context) {
  //     console.log('error minting!', { error, variables, context });
  //     mintFailure(error);
  //   },
  // });

  const mintTxHash = mintTransaction?.hash; // || tradeInTransaction?.hash;
  if (mintTxHash) {
    console.log('mint tx:', mintTxHash);
  }

  const isBalanceSufficient =
    mintPrice && balanceData && balanceData.value >= mintPrice;

  useEffect(() => {
    if (
      isMintableLoading ||
      isMintPriceLoading ||
      signerLoading ||
      isBalanceLoading
    ) {
      setButtonText('Loading...');
    } else if (!isMintable) {
      setButtonText('Minting disabled');
    } else if (!proof) {
      setButtonText('Not on the whitelist!');
    } else if (hasMinted) {
      setButtonText('Already minted!');
    } else if (isMinting) {
      setButtonText('Minting...');
    } else if (!isBalanceSufficient) {
      setButtonText(`Must have at least ${formatEther(mintPrice || 1n)} Ξ`);
    } else {
      setButtonText(`Mint for ${formatEther(mintPrice || 1n)} Ξ`);
    }
  }, [
    isMintable,
    signerLoading,
    isMintPriceLoading,
    hasMinted,
    isBalanceSufficient,
  ]);

  // mintContract._mintPrice();

  const onMint = async (): Promise<void> => {
    if (!proof || isMintableLoading || isMintPriceLoading) {
      // eslint-disable-next-line no-console
      console.error({
        proof,
        isMintableLoading,
        isMintPriceLoading,
      });
      return;
    }
    setIsMinting(true);
    mintNft();
  };

  // const [imageHash /* , setPfpId */] = useState<number | undefined>();

  // celebration thing
  // useContractEvent(
  //   {
  //     addressOrName: contractAddress,
  //     contractInterface: ATXDAO_MINTER_ABI,
  //   },
  //   'Transfer',
  //   async (args: EventArgs) => {
  //     const [from, to, tokenId, event] = args;
  //     console.log({ from, to, tokenId, event });
  //     if (to.toLowerCase() === accountData?.address?.toLowerCase()) {
  //     }
  //   }
  // );

  return (
    <Container p={6} maxWidth="400px" display="block" overflow="none">
      <FormControl>
        <FormErrorMessage hidden={!errorMessage}>
          {errorMessage}
        </FormErrorMessage>
        <Stack spacing={8}>
          <PfpImage active={status === 'success'} /* imageHash={imageHash} */ />
          <Stack spacing={2} hidden={!!proof}>
            <Text>Your address is not on the whitelist. </Text>
            <Code>{address}</Code>
          </Stack>
          <Button
            isLoading={
              isMintableLoading ||
              isMintPriceLoading ||
              signerLoading ||
              isMinting
            }
            loadingText={buttonText}
            onClick={onMint}
            disabled={
              !!(
                !proof ||
                signerLoading ||
                signerError ||
                isMintPriceLoading ||
                !isMintable ||
                buttonText === 'Minted!' ||
                hasMinted ||
                isMinting ||
                !isBalanceSufficient
              )
            }
            boxShadow="lg"
            fontWeight="600"
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
          >
            {buttonText}
          </Button>
          <Alert
            status={status === 'success' ? 'success' : 'error'}
            fontSize="md"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            hidden={status === 'unsubmitted'}
          >
            {status === 'success' ? (
              <AlertDescription mt={-1}>
                <Flex>
                  <Center>Successfully minted!</Center>
                  {mintTxHash && (
                    <Center>
                      <Button
                        rightIcon={<LinkIcon />}
                        as="a"
                        size="xs"
                        ml={2}
                        target="_blank"
                        href={`${blockExplorer}/tx/${mintTxHash}`}
                      >
                        Etherscan
                      </Button>
                    </Center>
                  )}
                </Flex>
              </AlertDescription>
            ) : (
              <AlertDescription mt={-1}>
                <Text mb={4}>{errorMessage}</Text>
                <Text
                  as="pre"
                  fontSize="8px"
                  textAlign="left"
                  lineHeight="8px"
                  hidden={!proof}
                >
                  {JSON.stringify(proof, undefined, 4)}
                </Text>
              </AlertDescription>
            )}
          </Alert>
        </Stack>
      </FormControl>
    </Container>
  );
};

export { MintForm };
