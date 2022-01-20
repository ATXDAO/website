// eslint-disable react/function-component-definition
import { AddIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  Button,
  Container,
  FormControl,
  Stack,
  Link,
  Text,
  Code,
  Image,
  useTimeout,
  useTooltip,
  Tooltip,
} from '@chakra-ui/react';
import { ATXDAONFTV2 } from 'contracts/types';
import { BigNumber, ContractTransaction } from 'ethers';
import { FC, useEffect, useMemo, useState } from 'react';
import { contractsByNetwork, SupportedNetwork } from 'util/constants';
import {
  useAccount,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
} from 'wagmi';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ATXDAONFT_V2_ABI = require('../contracts/ATXDAONFT_V2.json');

const etherscanUrl = (tx: ContractTransaction): string =>
  `https://etherscan.io/tx/${tx.hash}`;

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

  const [buttonText, setButtonText] = useState<string>('Loading...');

  const provider = useProvider();

  const [mintPrice, setMintPrice] = useState<BigNumber | undefined>();
  const [isMintable, setIsMintable] = useState<boolean | undefined>();

  const [{ data: networkData }] = useNetwork();
  const networkName = (networkData.chain?.name || 'mainnet').toLowerCase();
  const { address: contractAddress, merkleTree } =
    contractsByNetwork[networkName as SupportedNetwork];

  const proof = accountData
    ? merkleTree.proofs[accountData?.address.toLowerCase()]
    : undefined;

  const mintContract = useContract<ATXDAONFTV2>({
    addressOrName: contractAddress,
    contractInterface: ATXDAONFT_V2_ABI,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    mintContract._mintPrice().then((price) => setMintPrice(price));
    mintContract.isMintable().then((mintable) => setIsMintable(mintable));
  }, [accountData?.address, contractAddress]);

  const isMintableLoading = typeof isMintable === 'undefined';
  const isMintPriceLoading = typeof mintPrice === 'undefined';

  useEffect(() => {
    if (isMintableLoading || isMintPriceLoading || signerLoading) {
      setButtonText('Loading...');
    } else if (!isMintable) {
      setButtonText('Minting disabled');
    } else if (!proof) {
      setButtonText('Not on the whitelist!');
    }
  }, [isMintable, signerLoading, isMintPriceLoading]);

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
      setTransaction(await mintContract.mint(proof, { value: mintPrice }));
    } catch (err) {
      setStatus('error');
      setErrorMessage(tryParseError((err as Error).message));
    }
  };

  const pfpId = useMemo(
    () => Math.floor(Math.random() * 150) + 26,
    [accountData?.address]
  );

  return (
    <Container p={6} maxWidth="400px" display="block" overflow="none">
      <FormControl error={errorMessage || undefined}>
        <Stack spacing={8}>
          <Image
            src={`https://ipfs.io/ipfs/QmeJVHwX4fv6hiRWgM5YkyAstYWGgMkXxjxRxbBv8XTcPh/${pfpId}.png`}
            fallbackSrc="/img/zilker-placeholder.png"
            borderRadius="50%"
            maxHeight="360px"
            width="auto"
            height="auto"
          />
          <Stack spacing={2} hidden={!!proof}>
            <Text>Your address is not on the whitelist. </Text>
            <Code>{accountData && accountData.address}</Code>
          </Stack>
          <Tooltip>
            <Button
              isLoading={
                isMintableLoading || isMintPriceLoading || signerLoading
              }
              type="submit"
              onClick={onMint}
              disabled={
                !!(
                  !proof ||
                  signerLoading ||
                  signerError ||
                  isMintPriceLoading ||
                  !isMintable
                )
              }
              boxShadow="lg"
              fontWeight="600"
              _hover={{ boxShadow: 'md' }}
              _active={{ boxShadow: 'lg' }}
            >
              {buttonText}
            </Button>
          </Tooltip>
          <Alert
            status={status === 'success' ? 'success' : 'error'}
            fontSize="md"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            hidden={status === 'unsubmitted'}
          >
            {status === 'success' ? (
              <>
                <AddIcon />
                <AlertDescription mt={-1}>
                  {transaction && (
                    <Link href={etherscanUrl(transaction)}> Status</Link>
                  )}
                </AlertDescription>
              </>
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
