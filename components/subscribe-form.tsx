import { AtSignIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
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
import jsonp from 'jsonp';
import { stringify } from 'query-string';
import {
  Dispatch,
  FC,
  FormEventHandler,
  SetStateAction,
  useState,
} from 'react';

const mailchimpUrl =
  'https://atxdao.us6.list-manage.com/subscribe/post-json?u=a4c2b4ef30c235da6122bddf8&id=189b82bd8d';

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
        onChange={e => setValue(e.target.value)}
        {...props}
      />
    </InputGroup>
  </FormControl>
);

interface MailchimpResponse {
  result: string;
  msg: string;
}

const SubscribeForm: FC = () => {
  const [email, setEmail] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [status, setStatus] = useState<'unsubmitted' | 'error' | 'success'>(
    'unsubmitted'
  );
  const [statusMessage, setStatusMessage] = useState('');

  const onSubmit: FormEventHandler = async event => {
    event.preventDefault();
    const qs = stringify({
      MERGE0: email,
    });
    setIsPosting(true);
    const postUrl = [mailchimpUrl, qs].join('&');
    jsonp(
      postUrl,
      { param: 'c' },
      (err: Error | null, data: MailchimpResponse) => {
        if (err) {
          setStatus('error');
          setStatusMessage(`Failed to add to list: ${err.toString()}`);
        } else if (
          data.result === 'success' ||
          data.msg.includes('already subscribed')
        ) {
          setStatus('success');
          setStatusMessage('Thanks for subscribing!');
        } else {
          setStatus('error');
          setStatusMessage(data.msg);
        }
        setIsPosting(false);
      }
    );
  };

  return (
    <Container p={6} maxWidth="420px" display="block" overflow="auto">
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <TextInput
            type="email"
            name="email"
            value={email}
            setValue={setEmail}
            placeholder="Email"
          >
            <AtSignIcon />
          </TextInput>
          <Button
            type="submit"
            boxShadow={isPosting ? 'lg' : 'sm'}
            fontWeight="600"
            disabled={isPosting}
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
          >
            Sign up for dao updates
          </Button>
          <FormControl hidden={status !== 'unsubmitted'}>
            <FormHelperText color="gray.600">
              We will never share your email.
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
            <AlertIcon />
            <AlertDescription mt={-1}>{statusMessage}</AlertDescription>
          </Alert>
        </Stack>
      </form>
    </Container>
  );
};

export { SubscribeForm };
