/* eslint-disable no-console */
import {
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { PfpImage } from 'components/pfp-image';
import { useFireworks } from 'hooks/app-hooks';
import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';
import {
  mintContractByNetwork,
  EventArgs,
  SupportedNetwork,
} from 'utils/constants';
import { useContractEvent, useEnsLookup, useNetwork } from 'wagmi';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ATXDAONFT_V2_ABI = require('../contracts/ATXDAONFT_V2.json');

interface NewOwnerArgs {
  pfpId: number;
  address: string;
}

const shortenAddress = (addr: string): string =>
  `${addr.substring(0, 6)}...${addr.slice(addr.length - 4)}`;

const NewOwner: FC<NewOwnerArgs> = ({ pfpId, address }) => {
  // some hacks bc ens lookup wasnt happening on re-renders
  const [ens, setEns] = useState<string | undefined>();
  const [{ data: ensData }] = useEnsLookup({
    address,
  });
  useEffect(() => {
    if (ensData && address) {
      setEns(ensData);
    }
  }, [ens, ensData, address]);

  return (
    <VStack width="360px" overflow="hidden" spacing={5}>
      <PfpImage pfpId={pfpId} height="360px" active />
      <Heading fontSize="2rem">{ens || shortenAddress(address)}</Heading>
    </VStack>
  );
};

const EventPage: NextPage = () => {
  // first thing's first
  const [, setFireworks] = useFireworks();
  useEffect(() => {
    setFireworks(true);
  });
  const [{ data: networkData }] = useNetwork();
  const networkName = (networkData.chain?.name || 'mainnet').toLowerCase();
  const { address: contractAddress } =
    mintContractByNetwork[networkName as SupportedNetwork];

  const [owners, setOwners] = useState<NewOwnerArgs[]>([
    {
      address: '0x6d7ddd863eb2dad990bc05bdd3357e32850509e9',
      pfpId: 29,
    },
    {
      address: '0x723960d9a5c6ab71853059861d1c6146770a6dc1',
      pfpId: 28,
    },
  ]);

  useContractEvent(
    {
      addressOrName: contractAddress,
      contractInterface: ATXDAONFT_V2_ABI,
    },
    'Transfer',
    async (args: EventArgs) => {
      const [from, to, tokenId, event] = args;
      console.log({ from, to, tokenId, event });
      setOwners((oldOwners) => [
        { address: to, pfpId: tokenId.toNumber() },
        ...oldOwners.slice(0, 2),
      ]);
    }
  );

  return (
    <Layout title="atxdao" canToggleHeader>
      <Container width="100%" height="100%">
        <VStack spacing={10}>
          <Heading fontSize="4rem">mint.atxdao.com</Heading>
          <Flex height="55vh">
            <Center>
              <HStack
                spacing={12}
                overflowX="hidden"
                alignItems="left"
                textAlign="left"
              >
                {owners.map((owner) => {
                  const { address, pfpId } = owner;
                  return <NewOwner key={`${address}-${pfpId}`} {...owner} />;
                })}
              </HStack>
            </Center>
          </Flex>
          <HStack spacing={12}>
            <Spacer />
            <Image
              maxWidth="12vw"
              maxHeight="20vh"
              src="/img/sponsors/dexible.png"
            />
            <Image
              maxWidth="12vw"
              maxHeight="20vh"
              src="/img/sponsors/quai.png"
            />
            <Image
              maxWidth="12vw"
              maxHeight="20vh"
              src="/img/sponsors/pionex.png"
            />
            <Image
              maxWidth="20vw"
              maxHeight="20vh"
              src="/img/zilker-poap.png"
            />
            <Spacer />
          </HStack>
        </VStack>
      </Container>
    </Layout>
  );
};

export default EventPage;
