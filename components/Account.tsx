/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { Button } from '@chakra-ui/react';
import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { injected } from '../connectors';
import useENSName from '../hooks/useENSName';
import { formatEtherscanLink, shortenHex } from '../util';

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account: FC<AccountProps> = ({ triedToEagerConnect }) => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  // initialize metamask onboarding
  const onboarding = useRef<MetaMaskOnboarding>();

  useLayoutEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  // manage connecting state for injected connector
  const [, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  const ENSName = useENSName(account || '');

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== 'string') {
    const hasMetaMaskOrWeb3Available =
      MetaMaskOnboarding.isMetaMaskInstalled() ||
      (window as any)?.ethereum ||
      (window as any)?.web3;

    return (
      <div>
        {hasMetaMaskOrWeb3Available ? (
          <Button
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((_error) => {
                // ignore the error if it's a user rejected request
                if (_error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(_error);
                }
              });
            }}
          >
            {MetaMaskOnboarding.isMetaMaskInstalled()
              ? 'Connect to MetaMask'
              : 'Connect to Wallet'}
          </Button>
        ) : (
          <Button onClick={() => onboarding.current?.startOnboarding()}>
            Install Metamask
          </Button>
        )}
      </div>
    );
  }

  return (
    <a
      {...{
        href: formatEtherscanLink('Account', [chainId || 1, account]),
        target: '_blank',
        rel: 'noopener noreferrer',
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
  );
};

export default Account;
