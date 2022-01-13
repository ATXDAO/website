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
  useColorModeValue,
} from '@chakra-ui/react';
import { parseUnits } from '@ethersproject/units';
import MINT_ABI from 'contracts/mint.json';
import { Mint } from 'contracts/types';
import { Overrides } from 'ethers';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useContractWrite, useProvider } from 'wagmi';

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
  const [statusMessage] = useState('');
  const [status] = useState<'unsubmitted' | 'error' | 'success'>('unsubmitted');
  const provider = useProvider();

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await useContractWrite<Mint>(
        {
          addressOrName: '0xF61be28561137259375cbE88f28D4F163B09c94C',
          contractInterface: MINT_ABI,
          signerOrProvider: provider,
        },
        'mint',
        { overrides: { value: parseUnits(values) } as Overrides }
      );
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <Container p={6} maxWidth="420px" display="block" overflow="auto">
      <FormControl onSubmit={onSubmit} error={errorMessage || undefined}>
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
            boxShadow="lg"
            fontWeight="600"
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
          >
            Mint
          </Button>
          <FormControl hidden={status !== 'unsubmitted'}>
            <FormHelperText>
              {errorMessage !== '' ? errorMessage : 'Provide correct ΞETH.'}
            </FormHelperText>
          </FormControl>
          <Alert
            status={status === 'success' ? 'success' : 'error'}
            fontSize="md"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            hidden={status === 'unsubmitted'}
          >
            <AddIcon />
            <AlertDescription mt={-1}>{statusMessage}</AlertDescription>
          </Alert>
        </Stack>
      </FormControl>
    </Container>
  );
};

export { MintForm };
