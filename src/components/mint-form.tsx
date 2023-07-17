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
import { getAddress } from 'ethers';
import { useFireworks } from 'hooks/app-hooks';
import { FC, useEffect, useState } from 'react';
import {
  mintContractByNetwork, // EventArgs,
  SupportedNetwork,
  ATXDAOMINTER_ABI,
  ATXDAONFT_V2_ABI,
  nftContractByNetwork,
} from 'utils/constants';
import { formatEther } from 'viem';
import {
  useAccount,
  useBalance,
  useNetwork,
  useWalletClient,
  useContractWrite,
  useContractReads,
  useContractEvent,
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

  if (!address) {
    throw new Error('no address');
  }

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
    chain?.blockExplorers?.etherscan.url || 'https://etherscan.io';

  const addressData =
    merkleTree.addressData[address?.toLowerCase() || ''] || {};

  const { proof, isNewMember, tokenURI } = addressData;

  const minterContractMeta = {
    abi: ATXDAOMINTER_ABI,
    address: contractAddress,
  };

  const nftContractMeta = {
    abi: ATXDAONFT_V2_ABI,
    address: nftContractByNetwork[networkName].address,
  };

  const {
    data: mintableAndPriceData,
    isLoading: mintableAndPriceLoading,
    isError: mintableAndPriceDataError,
  } = useContractReads({
    cacheTime: 600_000, // 10 minutes
    contracts: [
      {
        ...minterContractMeta,
        functionName: 'isMintable',
      },
      {
        ...minterContractMeta,
        functionName: 'price',
      },
    ],
  });
  const [isMintable, mintPrice] =
    mintableAndPriceData && !mintableAndPriceDataError
      ? [
          mintableAndPriceData[0].result as boolean | undefined,
          mintableAndPriceData[1].result as bigint | undefined,
        ]
      : [undefined, undefined];

  const {
    data: authData,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useContractReads({
    cacheOnBlock: true,
    contracts: [
      {
        ...minterContractMeta,
        functionName: 'hasMinted',
        args: [address],
      },
      {
        ...minterContractMeta,
        functionName: 'canMint',
        args: [address, proof, tokenURI],
      },
      {
        ...minterContractMeta,
        functionName: 'canTradeIn',
        args: [address, proof, tokenURI],
      },
      {
        ...nftContractMeta,
        functionName: 'balanceOf',
        args: [address],
      },
    ],
  });
  const [hasMinted, canMint, canTradeIn, nftBalance] =
    authData && !isAuthError
      ? [
          authData[0].result as boolean | undefined,
          authData[1].result as boolean | undefined,
          authData[2].result as boolean | undefined,
          authData[3].result as bigint | undefined,
        ]
      : [undefined, undefined, undefined];

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
      console.log('transaction submitted!', { data, variables, context });
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
  useEffect(() => {
    console.log({
      chain,
      address,
      proof,
      isNewMember,
      tokenURI,
      mintTxHash,
      canMint,
      canTradeIn,
    });
  }, [mintTxHash, isAuthLoading]);

  const isBalanceSufficient =
    canTradeIn || (mintPrice && balanceData && balanceData.value >= mintPrice);

  useEffect(() => {
    if (
      mintableAndPriceLoading ||
      signerLoading ||
      isBalanceLoading ||
      isAuthLoading
    ) {
      setButtonText('Loading...');
    } else if (!isMintable) {
      setButtonText('Minting disabled');
    } else if (!proof) {
      setButtonText('Not on the whitelist!');
    } else if (hasMinted) {
      setButtonText('Already minted!');
    } else if (nftBalance && !canTradeIn) {
      setButtonText('Already own an NFT!');
    } else if (!canMint && !canTradeIn) {
      console.error({
        error: 'not authorized',
        canMint,
        canTradeIn,
        address,
        proof,
        tokenURI,
        hasMinted,
      });
      setButtonText('Not authorized, contact support');
    } else if (isMinting) {
      setButtonText('Minting...');
    } else if (!isBalanceSufficient) {
      setButtonText(`Must have at least ${formatEther(mintPrice || 1n)} ETH`);
    } else if (!canMint && canTradeIn) {
      setButtonText('Trade-in not enabled yet');
    } else {
      setButtonText(`Mint for ${formatEther(mintPrice || 1n)} ETH`);
    }
  }, [
    isMintable,
    signerLoading,
    mintableAndPriceLoading,
    hasMinted,
    isBalanceSufficient,
  ]);

  const onMint = async (): Promise<void> => {
    if (!proof || mintableAndPriceLoading) {
      // eslint-disable-next-line no-console
      console.error({
        proof,
        mintableAndPriceLoading,
      });
      return;
    }
    setIsMinting(true);
    mintNft();
  };

  // const [imageHash /* , setPfpId */] = useState<number | undefined>();

  // celebration thing
  useContractEvent({
    ...nftContractMeta,
    eventName: 'Transfer',
    listener: (logs) => {
      logs.forEach((log) => {
        const { args } = log as unknown as {
          args: { from: string; to: string; tokenId: bigint };
        };
        const { from, to, tokenId } = args;
        console.log({ from, to, tokenId });

        if (getAddress(to) === getAddress(address)) {
          mintSuccess();
        }
      });
      // console.log({ from, to, tokenId });
      // console.log(args.node, args.label, args.owner);
    },
  });

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
            isLoading={mintableAndPriceLoading || signerLoading || isMinting}
            loadingText={buttonText}
            onClick={onMint}
            isDisabled={
              !!(
                !proof ||
                isAuthLoading ||
                !canMint ||
                signerLoading ||
                signerError ||
                mintableAndPriceLoading ||
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
