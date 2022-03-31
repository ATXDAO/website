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
import { ATXDAONFT_V2 } from 'contracts/types';
import { BigNumber, ContractTransaction } from 'ethers';
import { formatEther, getAddress, isAddress } from 'ethers/lib/utils';
import { useFireworks } from 'hooks/app-hooks';
import { FC, useEffect, useState } from 'react';
import {
  mintContractByNetwork,
  EventArgs,
  SupportedNetwork,
} from 'utils/constants';
import {
  useAccount,
  useBalance,
  useContract,
  useContractEvent,
  useNetwork,
  useProvider,
  useSigner,
} from 'wagmi';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ATXDAONFT_V2_ABI = require('../contracts/ATXDAONFT_V2.json');

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
  const [, setFireworks] = useFireworks();
  const [{ data: accountData }] = useAccount();
  const [errorMessage, setErrorMessage] = useState('');
  const [transaction, setTransaction] = useState<
    ContractTransaction | undefined
  >();
  const [status, setStatus] = useState<'unsubmitted' | 'error' | 'success'>(
    'unsubmitted'
  );
  const [{ data: signer, error: signerError, loading: signerLoading }] =
    useSigner();
  const [{ data: balanceData, loading: isBalanceLoading }] = useBalance({
    addressOrName: accountData?.address,
    skip: !accountData,
  });

  const [buttonText, setButtonText] = useState('Loading...');

  const provider = useProvider();

  const [mintPrice, setMintPrice] = useState<BigNumber | undefined>();
  const [isMintable, setIsMintable] = useState<boolean | undefined>();
  const [isMinting, setIsMinting] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);

  const [{ data: networkData }] = useNetwork();
  const networkName = (networkData.chain?.name || 'mainnet').toLowerCase();
  const {
    address: contractAddress,
    merkleTree,
    blockExplorer,
  } = mintContractByNetwork[networkName as SupportedNetwork];

  const proof = accountData
    ? merkleTree.proofs[accountData?.address.toLowerCase()]
    : undefined;

  const mintContract = useContract<ATXDAONFT_V2>({
    addressOrName: contractAddress,
    contractInterface: ATXDAONFT_V2_ABI,
    signerOrProvider: signer || provider,
  });

  const isBalanceSufficient =
    mintPrice && balanceData && balanceData.value.gte(mintPrice);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    mintContract._mintPrice().then((price) => setMintPrice(price));
    mintContract.isMintable().then((mintable) => setIsMintable(mintable));
    if (accountData?.address && isAddress(accountData?.address)) {
      mintContract
        .hasMinted(getAddress(accountData?.address))
        .then((_hasMinted) => setHasMinted(_hasMinted));
    }
  }, [accountData?.address, contractAddress]);

  const isMintableLoading = typeof isMintable === 'undefined';
  const isMintPriceLoading = typeof mintPrice === 'undefined';

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
      setButtonText(`Must have at least ${formatEther(mintPrice)} Ξ`);
    } else {
      setButtonText(`Mint for ${formatEther(mintPrice)} Ξ`);
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
    try {
      setIsMinting(true);
      const tx = await mintContract.mint(proof, { value: mintPrice });
      setTransaction(tx);
    } catch (err) {
      setStatus('error');
      setErrorMessage(tryParseError((err as Error).message));
    }
  };

  const [pfpId, setPfpId] = useState<number | undefined>();

  useContractEvent(
    {
      addressOrName: contractAddress,
      contractInterface: ATXDAONFT_V2_ABI,
    },
    'Transfer',
    async (args: EventArgs) => {
      const [from, to, tokenId, event] = args;
      console.log({ from, to, tokenId, event });
      if (to.toLowerCase() === accountData?.address.toLowerCase()) {
        console.log('your nft was minted!!', tokenId.toNumber());
        setPfpId(tokenId.toNumber());
        setButtonText('Minted!');
        setIsMinting(false);
        setStatus('success');
        setFireworks(true);
      }
    }
  );

  return (
    <Container p={6} maxWidth="400px" display="block" overflow="none">
      <FormControl>
        <FormErrorMessage hidden={!errorMessage}>
          {errorMessage}
        </FormErrorMessage>
        <Stack spacing={8}>
          <PfpImage active={!!pfpId && status === 'success'} pfpId={pfpId} />
          <Stack spacing={2} hidden={!!proof}>
            <Text>Your address is not on the whitelist. </Text>
            <Code>{accountData && accountData.address}</Code>
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
                  {transaction && (
                    <Center>
                      <Button
                        rightIcon={<LinkIcon />}
                        as="a"
                        size="xs"
                        ml={2}
                        target="_blank"
                        href={`${blockExplorer}/tx/${transaction.hash}`}
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
