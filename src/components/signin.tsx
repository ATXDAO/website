/* eslint-disable no-console */
import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, VisuallyHidden } from '@chakra-ui/react';
import { useIsMounted } from 'hooks/app-hooks';
import { FC, useCallback, useState, useEffect } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';

const expiresAt: () => Date = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date;
};

export const Signin: FC = () => {
  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const [{ nftOwner, loading }, setState] = useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
    nftOwner?: boolean;
  }>({});
  const { signMessageAsync } = useSignMessage();
  const isMounted = useIsMounted();

  const signIn = useCallback(async () => {
    try {
      const address = accountData?.address;
      const chainId = activeChain?.id;
      if (!address || !chainId) return;

      setState((x) => ({ ...x, error: undefined, loading: true }));

      const nonceRes = await fetch('/api/nonce');
      const date = new Date();
      date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
      const message = new SiweMessage({
        domain: window.location.host,
        address,
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

      setState((x) => ({ ...x, address, loading: true }));
      try {
        const res = await fetch('/api/me');
        const json = await res.json();
        // XXX: not getting here
        console.log(json);
        setState((x) => ({
          ...x,
          nftOwner: json.nftOwner,
          address: json.address,
          loading: false,
        }));
      } catch (_error) {
        console.log(_error);
      }
    } catch (err) {
      const error = err as Error;
      setState((x) => ({ ...x, error, loading: false }));
    }
  }, []);

  // Fetch user when:
  useEffect(() => {
    const handler: () => Promise<void> = async () => {
      try {
        const res = await fetch('/api/me');
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address, loading: false }));
      } catch (_error) {
        console.log(_error);
      }
    };
    handler();
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, []);

  useEffect(() => {
    signIn();
  }, [accountData?.address]);

  if (!isMounted || !accountData || loading) {
    return (
      <Tooltip label="Authenticating...">
        <IconButton aria-label="Authenticating..." variant="ghost" isLoading />
      </Tooltip>
    );
  }
  // eslint-disable-next-line no-nested-ternary
  return isMounted && accountData ? (
    nftOwner ? (
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
