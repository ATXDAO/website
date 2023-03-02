/* eslint-disable no-console */
import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Tooltip,
  VisuallyHidden,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useIsMounted, useUser } from 'hooks/app-hooks';
import { FC, useState, useEffect } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useNetwork, useSignMessage, useDisconnect } from 'wagmi';

const expiresAt: () => Date = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date;
};

export const Signin: FC = () => {
  const toast = useToast();
  const { address: accountAddress, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [loggedIn, setLoggedIn] = useState(false);
  const [{ loading }, setState] = useState<{
    error?: Error;
    loading?: boolean;
  }>({});
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const isMounted = useIsMounted();
  const [user, setUser] = useUser();

  const currentUser = async (): Promise<void> => {
    try {
      const res = await axios('/api/me');
      setUser((x) => ({
        ...x,
        address: res.data.address,
        nftOwner: res.data.nftOwner,
      }));
    } catch (err) {
      const error = err as Error;
      setState((x) => ({ ...x, error, loading: false }));
    }
  };

  const signIn = async (): Promise<void> => {
    await axios('/api/me')
      .then((res) => {
        setUser((x) => ({
          ...x,
          address: res.data.address,
          nftOwner: res.data.nftOwner,
        }));
      })
      .catch(async () => {
        try {
          const chainId = chain?.id;
          if (chain?.unsupported) {
            disconnect();
            toast({
              title: 'Please Switch Networks',
              description: 'Only Ethereum Mainnet is Supported',
              status: 'error',
              duration: 6000,
              isClosable: true,
            });
            return;
          }

          if (!isConnected || loggedIn) return;

          setState((x) => ({
            ...x,
            error: undefined,
            loading: true,
          }));

          const nonceRes = await fetch('/api/nonce');
          const message = new SiweMessage({
            domain: window.location.host,
            address: accountAddress,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce: await nonceRes.text(),
            expirationTime: expiresAt().toISOString(),
          });
          const signature = await signMessageAsync({
            message: message.prepareMessage(),
          });

          const verifyRes = await fetch('/api/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
          });
          if (!verifyRes.ok) throw new Error('Error verifying message');

          setState((x) => ({ ...x, loading: true }));
          try {
            const res = await fetch('/api/me');
            const json = await res.json();
            setState((x) => ({
              ...x,
              loading: false,
            }));
            setUser((x) => ({
              ...x,
              address: json.address,
              nftOwner: json.nftOwner,
            }));
          } catch (_error) {
            console.log(_error);
          }
        } catch (err) {
          const error = err as Error;
          setState((x) => ({ ...x, error, loading: false }));
        }
      });
  };

  useEffect(() => {
    if (!isConnected) {
      setLoggedIn(false);
      return;
    }
    if (!loggedIn) {
      signIn();
      setLoggedIn(true);
    }
  }, [accountAddress]);

  useEffect(() => {
    currentUser();
  }, []);

  if (loading) {
    return (
      <Tooltip label="Authenticating...">
        <IconButton aria-label="Authenticating..." variant="ghost" isLoading />
      </Tooltip>
    );
  }
  // eslint-disable-next-line no-nested-ternary
  return isMounted && user?.address ? (
    user?.nftOwner ? (
      <Tooltip label="DAO membership verified">
        <IconButton
          aria-label="DAO membership verified"
          variant="ghost"
          icon={<CheckIcon />}
        />
      </Tooltip>
    ) : (
      <Tooltip label="Not a member of ATX DAO">
        <IconButton
          aria-label="Not a member of ATX DAO"
          variant="ghost"
          icon={<NotAllowedIcon />}
        />
      </Tooltip>
    )
  ) : (
    <VisuallyHidden>not connected</VisuallyHidden>
  );
};
