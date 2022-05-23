/* eslint-disable no-console */
import ATXDAONFT_V2_ABI from '../contracts/ATXDAONFT_V2.json';
import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, VisuallyHidden } from '@chakra-ui/react';
import { ATXDAONFT_V2 } from 'contracts/types';
import { getAddress, isAddress } from 'ethers/lib/utils';
import { useIsMounted } from 'hooks/app-hooks';
import { FC, useState, useEffect } from 'react';
import { SiweMessage } from 'siwe';
import { mintContractByNetwork, SupportedNetwork } from 'utils/constants';
import {
  useAccount,
  useNetwork,
  useSignMessage,
  useContract,
  useProvider,
  useSigner,
} from 'wagmi';

const expiresAt: () => Date = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date;
};

export const Signin: FC = () => {
  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const [loggedIn, setLoggedIn] = useState(false);
  const [{ nftOwner, loading }, setState] = useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
    nftOwner?: boolean;
  }>({});
  const { signMessageAsync } = useSignMessage();
  const isMounted = useIsMounted();

  const signIn = async (): Promise<void> => {
    try {
      const address = accountData?.address;
      const chainId = activeChain?.id;
      if (!address || !chainId || loggedIn) return;

      setState((x) => ({
        ...x,
        error: undefined,
        loading: true,
        address,
      }));

      const nonceRes = await fetch('/api/nonce');
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
  };

  const { data: signer } = useSigner();

  const provider = useProvider();
  const networkName = (activeChain?.name || 'ethereum').toLowerCase();
  const { address: contractAddress } =
    mintContractByNetwork[networkName as SupportedNetwork];

  const mintContract = useContract<ATXDAONFT_V2>({
    addressOrName: contractAddress,
    contractInterface: ATXDAONFT_V2_ABI,
    signerOrProvider: signer || provider,
  });
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
    if (!accountData) {
      setLoggedIn(false);
      return;
    }
    if (!loggedIn) {
      signIn();
      setLoggedIn(true);
    }
    if (accountData?.address && isAddress(accountData?.address)) {
      mintContract
        .hasMinted(getAddress(accountData?.address))
        .then((_hasMinted) => {
          setState((x) => ({ ...x, nftOwner: _hasMinted }));
        });
    }
  }, [accountData]);

  useEffect(() => {
    if (accountData?.address && isAddress(accountData?.address)) {
      mintContract
        .hasMinted(getAddress(accountData?.address))
        .then((_hasMinted) => {
          setState((x) => ({ ...x, nftOwner: _hasMinted }));
        });
    }
  }, []);

  if (loading) {
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
