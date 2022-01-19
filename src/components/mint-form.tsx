/* eslint-disable react/function-component-definition */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AddIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Stack,
  Link,
  Text,
  Box,
  Code,
  Image,
} from '@chakra-ui/react';
import { parseEther } from '@ethersproject/units';
import MINT_ABI from 'contracts/mint.json';
import { Mint } from 'contracts/types';
import { ContractTransaction } from 'ethers';
import { FC, useState } from 'react';
import { contractsByNetwork, SupportedNetwork } from 'util/constants';
import { useAccount, useContract, useNetwork, useSigner } from 'wagmi';

const etherscanUrl = (tx: ContractTransaction) =>
  `https://etherscan.io/tx/${tx.hash}`;

const tryParseError = (errorMsg: string) => {
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

  const [{ data: networkData }] = useNetwork();
  const networkName = (networkData.chain?.name || 'mainnet').toLowerCase();
  const contractData = contractsByNetwork[networkName as SupportedNetwork];

  const proof = accountData
    ? contractData.merkleTree.proofs[accountData?.address]
    : undefined;

  const mintContract = useContract<Mint>({
    addressOrName: '0xF61be28561137259375cbE88f28D4F163B09c94C',
    contractInterface: MINT_ABI,
    signerOrProvider: signer,
  });

  const onMint = async () => {
    try {
      setTransaction(await mintContract.mint({ value: parseEther('0.63') }));
    } catch (err) {
      setStatus('error');
      setErrorMessage(tryParseError((err as Error).message));
    }
  };

  return (
    <Container p={6} maxWidth="420px" display="block" overflow="none">
      <FormControl error={errorMessage || undefined}>
        <Stack spacing={3}>
          <Image
            src="https://cloudflare-ipfs.com/ipfs/QmeJVHwX4fv6hiRWgM5YkyAstYWGgMkXxjxRxbBv8XTcPh/26.png"
            borderRadius="50%"
          />
          <Stack spacing={2} hidden={!!proof}>
            <Text>Your address is not on the whitelist. </Text>
            <Code>{accountData && accountData.address}</Code>
          </Stack>
          <Button
            type="submit"
            onClick={onMint}
            disabled={!!(!proof || signerLoading || signerError)}
            boxShadow="lg"
            fontWeight="600"
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
          >
            Mint
          </Button>
          <FormControl hidden={status !== 'unsubmitted'}>
            <FormHelperText>Provide correct ΞETH.</FormHelperText>
          </FormControl>
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
              <AlertDescription mt={-1}>{errorMessage}</AlertDescription>
            )}
          </Alert>
        </Stack>
      </FormControl>
    </Container>
  );
};

export { MintForm };
