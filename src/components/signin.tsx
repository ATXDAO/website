import { Button } from '@chakra-ui/react';
import { useIsMounted } from 'hooks/app-hooks';
import { FC, useCallback, useState, useEffect } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useNetwork, useSignMessage, useDisconnect } from 'wagmi';

export const Profile: FC = () => {
  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const { disconnect } = useDisconnect();
  const [state, setState] = useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});
  const { signMessageAsync } = useSignMessage();
  const isMounted = useIsMounted();

  const signIn = useCallback(async () => {
    try {
      const address = accountData?.address;
      const chainId = activeChain?.id;
      if (!address || !chainId) return;

      setState((x) => ({ ...x, error: undefined, loading: true }));
      // Fetch random nonce, create SIWE message, and sign with wallet
      const nonceRes = await fetch('/api/nonce');
      console.log(nonceRes);
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
        expirationTime: date.toISOString(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error('Error verifying message');

      setState((x) => ({ ...x, address, loading: false }));
      try {
        const res = await fetch('/api/me');
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address, loading: false }));
      } catch (_error) {
        console.log(_error);
      }
    } catch (error) {
      setState((x) => ({ ...x, error, loading: false }));
    }
  }, []);

  // Fetch user when:
  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me');
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address, loading: false }));
      } catch (_error) {
        console.log(_error);
      }
    };
    // 1. page loads
    handler();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, []);

  useEffect(() => {
    console.log('changed');
    signIn();
  }, [accountData?.address]);

  if (isMounted && accountData) {
    return (
      <div>
        {/* Account content goes here */}

        {state.address ? (
          <div>
            <Button
              onClick={async () => {
                await fetch('/api/logout');
                disconnect();
                setState({});
              }}
            >
              Sign Out
            </Button>
          </div>
        ) : null}
      </div>
    );
  }

  return <div>{/* Connect wallet content goes here */}</div>;
};
