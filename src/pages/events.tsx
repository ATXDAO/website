import Events from '../components/events';
import ATXDAONFT_V2_ABI from '../contracts/ATXDAONFT_V2.json';
import { DaoEvent, extractEventDetails } from '../data/eventbrite';
import { Box, Heading } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { ATXDAONFT_V2 } from 'contracts/types';
import { getAddress, isAddress } from 'ethers/lib/utils';
import eventbrite from 'eventbrite';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useEffect, useState } from 'react';
import { mintContractByNetwork, SupportedNetwork } from 'utils/constants';
import {
  useAccount,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
} from 'wagmi';

const eventbriteAPI = process.env.NEXT_PRIVATE_EVENTBRITE_KEY;
const orgID = process.env.NEXT_PRIVATE_EVENTBRITE_ORGID;

// todo: use server-side api
export const getServerSideProps: GetServerSideProps = async () => {
  const sdk = eventbrite({ token: `${eventbriteAPI}` });
  const data = await sdk.request(`/organizations/${orgID}/events/`);

  return {
    props: {
      data,
    },
  };
};

// 8 weeks
const pastEventsDateDiff = 8 * 7 * 24 * 60 * 60 * 1000;

const EventsPage: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const contentPaddingX = ['1rem', '2rem', '3rem', '10rem'];
  const contentPaddingY = '3rem';
  const [isMember, setIsMember] = useState(false);
  const { address: accountAddress } = useAccount();
  const { chain } = useNetwork();
  const networkName = 'ethereum'.toLowerCase();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const { address: contractAddress } =
    mintContractByNetwork[networkName as SupportedNetwork];

  const mintContract = useContract({
    address: contractAddress,
    abi: ATXDAONFT_V2_ABI,
    signerOrProvider: signer || provider,
  }) as ATXDAONFT_V2;

  useEffect(() => {
    if (chain?.unsupported) {
      return;
    }
    if (accountAddress && isAddress(accountAddress)) {
      mintContract.hasMinted(getAddress(accountAddress)).then((_hasMinted) => {
        setIsMember(_hasMinted);
      });
    }
  }, [accountAddress]);

  const events = (data.events.map(extractEventDetails) as DaoEvent[]).sort(
    (e1, e2) => e1.timestamp.getTime() - e2.timestamp.getTime()
  );

  return (
    <Layout title="Events">
      <Box paddingX={contentPaddingX} paddingTop={contentPaddingY}>
        <Heading as="h1" mb="1rem">
          Upcoming Events
        </Heading>
        <Events
          events={events
            .filter((event) => event.timestamp.getTime() >= Date.now())
            .reverse()}
          isMember={isMember}
          address={accountAddress}
        />
        <Heading as="h1" mb="1rem">
          Recent Events
        </Heading>
        <Events
          events={events.filter(
            (event) =>
              event.timestamp.getTime() < Date.now() &&
              event.timestamp.getTime() >= Date.now() - pastEventsDateDiff
          )}
          isMember={isMember}
          address={accountAddress}
        />
      </Box>
    </Layout>
  );
};

export default EventsPage;
