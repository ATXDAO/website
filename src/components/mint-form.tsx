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
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Stack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { parseUnits } from '@ethersproject/units';
import MINT_ABI from 'contracts/mint.json';
import { Mint } from 'contracts/types';
import { ContractTransaction } from 'ethers';
import {
  Dispatch,
  FC,
  FormEventHandler,
  SetStateAction,
  useState,
} from 'react';
import { useContract, useSigner } from 'wagmi';

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

const TextInput: FC<
  InputProps & { setValue: Dispatch<SetStateAction<string>> }
> = ({ placeholder, children, setValue, ...props }) => (
  <FormControl isRequired>
    <InputGroup>
      <InputLeftElement>{children}</InputLeftElement>
      <Input
        placeholder={placeholder}
        aria-label={placeholder}
        _placeholder={{ color: useColorModeValue('gray.600', 'gray.200') }}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </InputGroup>
  </FormControl>
);

const MintForm: FC = () => {
  const [values, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [transaction, setTransaction] = useState<
    ContractTransaction | undefined
  >();
  const [status, setStatus] = useState<'unsubmitted' | 'error' | 'success'>(
    'unsubmitted'
  );
  const [{ data: signer, error: signerError, loading: signerLoading }] =
    useSigner();

  const mintContract = useContract<Mint>({
    addressOrName: '0xF61be28561137259375cbE88f28D4F163B09c94C',
    contractInterface: MINT_ABI,
    signerOrProvider: signer,
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setTransaction(await mintContract.mint({ value: parseUnits(values) }));
    } catch (err) {
      setStatus('error');
      setErrorMessage(tryParseError((err as Error).message));
    }
  };

  return (
    <Container p={6} maxWidth="420px" display="block" overflow="auto">
      <form onSubmit={onSubmit}>
        <FormControl error={errorMessage || undefined}>
          <Stack spacing={3}>
            <TextInput
              type="value"
              name="value"
              value={values}
              setValue={setValue}
              placeholder="ΞETH"
            />
            <Button
              type="submit"
              disabled={!!(signerLoading || signerError)}
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
      </form>
    </Container>
  );
};

export { MintForm };
