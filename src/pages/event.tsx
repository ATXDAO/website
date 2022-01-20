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
import { ATXDAONFTV2 } from 'contracts/types';
import { BigNumber, Event } from 'ethers';
import { useFireworks } from 'hooks/app-hooks';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { contractsByNetwork, SupportedNetwork } from 'util/constants';
import {
  useAccount,
  useContract,
  useContractEvent,
  useNetwork,
  useProvider,
} from 'wagmi';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ATXDAONFT_V2_ABI = require('../contracts/ATXDAONFT_V2.json');

type EventArgs = [from: string, to: string, tokenId: BigNumber, event: Event];

const EventPage: NextPage = () => {
  // first thing's first
  const [, setFireworks] = useFireworks();
  useEffect(() => {
    setFireworks(true);
  });
  const [{ data: accountData }] = useAccount();
  const provider = useProvider();
  const [{ data: networkData }] = useNetwork();
  const networkName = (networkData.chain?.name || 'mainnet').toLowerCase();
  const { address: contractAddress } =
    contractsByNetwork[networkName as SupportedNetwork];

  const mintContract = useContract<ATXDAONFTV2>({
    addressOrName: contractAddress,
    contractInterface: ATXDAONFT_V2_ABI,
    signerOrProvider: provider,
  });

  useContractEvent(
    {
      addressOrName: contractAddress,
      contractInterface: ATXDAONFT_V2_ABI,
    },
    'Transfer',
    async (args: EventArgs) => {
      const [from, to, tokenId, event] = args;
      console.log({ from, to, tokenId, event });
      const tokenUri = await mintContract.tokenURI(tokenId);
      console.log('tokenUri', tokenUri);
    }
  );

  return (
    <Layout title="atxdao" connected={!!accountData} canToggleHeader>
      <Container width="100%" height="100%">
        <VStack>
          <Heading>mint.atxdao.com</Heading>
          <Flex height="55vh">
            <Center>
              <HStack>
                <Center width="300px" height="300px">
                  hi there
                </Center>
                <Center width="300px" height="300px">
                  hi there
                </Center>
                <Center width="300px" height="300px">
                  hi there
                </Center>
              </HStack>
            </Center>
          </Flex>
          <Flex width="100%">
            <Spacer />
            <Center>
              <Heading>POAP:</Heading>
            </Center>
            <Spacer />
            <Center>
              <Image width="12rem" src="/img/zilker-poap.png" />
            </Center>
            <Spacer />
          </Flex>
        </VStack>
      </Container>
    </Layout>
  );
};

export default EventPage;
