/* eslint-disable no-console */
// eslint-disable react/function-component-definition
import { ConnectButton } from './connect-button';
import { RadioCard } from './radio-card';
import { LinkIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  Image,
  Stack,
  Text,
  useRadioGroup,
} from '@chakra-ui/react';
import { ATXDAOUkraineNFT } from 'contracts/types';
import { BigNumber, ContractTransaction } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useFireworks } from 'hooks/app-hooks';
import { FC, useEffect, useState } from 'react';
import {
  EventArgs,
  SupportedNetwork,
  UKRAINE_ETH_ADDRESS,
  ukraineContractByNetwork,
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
const UKRAINE_NFT_ABI = require('../contracts/ATXDAOUkraineNFT.json');

const TIERS = {
  '0': '0.0512',
  '1': '0.512',
  '2': '5.12',
};

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

const UkraineMintForm: FC = () => {
  const [, setFireworks] = useFireworks();
  const { data: accountData } = useAccount();
  const [errorMessage, setErrorMessage] = useState('');
  const [transaction, setTransaction] = useState<
    ContractTransaction | undefined
  >();
  const [status, setStatus] = useState<'unsubmitted' | 'error' | 'success'>(
    'unsubmitted'
  );
  const {
    data: signer,
    error: signerError,
    isLoading: signerLoading,
  } = useSigner();
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    addressOrName: accountData?.address,
    enabled: !!accountData,
  });

  const [buttonText, setButtonText] = useState('Loading...');

  const provider = useProvider();

  const [mintPrice, setMintPrice] = useState<BigNumber>(parseEther(TIERS[0]));
  const [isMintable, setIsMintable] = useState<boolean | undefined>();
  const [isMinting, setIsMinting] = useState(false);

  const { activeChain } = useNetwork();
  const networkName = (activeChain?.name || 'mainnet').toLowerCase();
  const { address: contractAddress, blockExplorer } =
    ukraineContractByNetwork[networkName as SupportedNetwork];

  const mintContract = useContract<ATXDAOUkraineNFT>({
    addressOrName: contractAddress,
    contractInterface: UKRAINE_NFT_ABI,
    signerOrProvider: signer || provider,
  });

  const isBalanceSufficient =
    mintPrice && balanceData && balanceData.value.gte(mintPrice);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    mintContract.isMintable().then((mintable) => setIsMintable(mintable));
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
    } else if (isMinting) {
      setButtonText('Minting...');
    } else if (!isBalanceSufficient) {
      setButtonText(`Must have at least ${formatEther(mintPrice)} ETH`);
    } else {
      setButtonText(`Mint for ${formatEther(mintPrice)} ETH`);
    }
  }, [isMintable, signerLoading, mintPrice, isBalanceSufficient]);

  const onMint = async (): Promise<void> => {
    if (isMintableLoading || isMintPriceLoading) {
      // eslint-disable-next-line no-console
      console.error({
        isMintableLoading,
        isMintPriceLoading,
      });
      return;
    }
    try {
      console.log(
        `network: ${networkName} contract: ${mintContract.address} recip: ${UKRAINE_ETH_ADDRESS}`
      );
      setIsMinting(true);
      const tx = await mintContract.mint(UKRAINE_ETH_ADDRESS, {
        value: mintPrice,
      });
      setTransaction(tx);
    } catch (err) {
      setStatus('error');
      setErrorMessage(tryParseError((err as Error).message));
    }
  };

  useContractEvent(
    {
      addressOrName: contractAddress,
      contractInterface: UKRAINE_NFT_ABI,
    },
    'Transfer',
    async (args: EventArgs) => {
      const [from, to, tokenId, event] = args;
      console.log({ from, to, tokenId, event });
      if (to.toLowerCase() === accountData?.address?.toLowerCase()) {
        console.log('your nft was minted!!', tokenId.toNumber());
        setButtonText('Minted!');
        setIsMinting(false);
        setStatus('success');
        setFireworks(true);
      }
    }
  );

  const {
    getRootProps,
    getRadioProps,
    value: tier,
  } = useRadioGroup({
    name: 'tier',
    defaultValue: '0',
    onChange: (val: '0' | '1' | '2') => {
      setMintPrice(parseEther(TIERS[val]));
    },
  });

  const radioGroupProps = getRootProps();

  return (
    <Container maxWidth="512px" display="block" overflow="none">
      <FormControl>
        <Stack spacing={8}>
          <Image src={`/img/ukraine/${tier}.png`} />
          <link rel="prefetch" href="/img/ukraine/1.png" />
          <link rel="prefetch" href="/img/ukraine/2.png" />
          <Center>
            <Stack direction="row" {...radioGroupProps}>
              {['0', '1', '2'].map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {TIERS[value as '0' | '1' | '2']} ETH
                  </RadioCard>
                );
              })}
            </Stack>
          </Center>
          {accountData ? (
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
                  signerLoading ||
                  signerError ||
                  isMintPriceLoading ||
                  !isMintable ||
                  buttonText === 'Minted!' ||
                  isMinting ||
                  !isBalanceSufficient
                )
              }
              size="lg"
              boxShadow="lg"
              fontWeight="600"
              _hover={{ boxShadow: 'md' }}
              _active={{ boxShadow: 'lg' }}
            >
              {buttonText}
            </Button>
          ) : (
            <ConnectButton
              size="lg"
              boxShadow="lg"
              fontWeight="600"
              _hover={{ boxShadow: 'md' }}
              _active={{ boxShadow: 'lg' }}
            >
              Connect to mint
            </ConnectButton>
          )}

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
              </AlertDescription>
            )}
          </Alert>
        </Stack>
      </FormControl>
    </Container>
  );
};

export { UkraineMintForm };
