import NO_IMAGE from '../../public/img/no_image.png';
import { Event } from '../components/event';
import ATXDAONFT_V2_ABI from '../contracts/ATXDAONFT_V2.json';
import { Box, Divider, useToast } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { ATXDAONFT_V2 } from 'contracts/types';
import { getAddress, isAddress } from 'ethers/lib/utils';
import eventbrite from 'eventbrite';
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { useState, useEffect } from 'react';
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
interface IName {
  text: string;
  html: string;
}

interface IImage {
  url: string;
}

interface ILogo {
  original: IImage;
}
interface IDescription {
  text: string;
  html: string;
}

interface ITime {
  timezone: string;
  local: string;
  utc: string;
}

interface IEvent {
  url: string;
  published: string;
  name: IName;
  description: IDescription;
  logo: ILogo;
  shareable: boolean;
  start: ITime;
  end: ITime;
  id: string;
  status: string;
  address: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const sdk = eventbrite({ token: `${eventbriteAPI}` });
  const data = await sdk.request(`/organizations/${orgID}/events/`);

  return {
    props: {
      data,
    },
  };
};

const EventsPage: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const contentPaddingX = ['1rem', '2rem', '3rem', '10rem'];
  const contentPaddingY = '3rem';
  const [isMember, setIsMember] = useState(false);

  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const networkName = (activeChain?.name || 'ethereum').toLowerCase();

  const { data: signer } = useSigner();

  const provider = useProvider();

  const { address: contractAddress } =
    mintContractByNetwork[networkName as SupportedNetwork];

  const mintContract = useContract<ATXDAONFT_V2>({
    addressOrName: contractAddress,
    contractInterface: ATXDAONFT_V2_ABI,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    if (accountData?.address && isAddress(accountData?.address)) {
      mintContract
        .hasMinted(getAddress(accountData?.address))
        .then((_hasMinted) => {
          setIsMember(_hasMinted);
        });
    }
  }, [accountData?.address]);

  return (
    <Layout title="Events">
      <Box paddingX={contentPaddingX} paddingTop={contentPaddingY}>
        {data.events
          .map((obj: IEvent, i: number) => (
            <div key={obj.id}>
              {i !== data.events.length - 1 && (
                <Divider
                  mb={['2rem', '3rem', '5rem']}
                  borderBottomWidth="4px"
                  borderRadius="6px"
                />
              )}
              <Box mb={['2rem', '3rem', '5rem']}>
                <Event
                  title={obj.name.text}
                  date={new Date(obj.start.local).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  startTime={new Date(obj.start.local).toLocaleTimeString(
                    'en-US',
                    {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    }
                  )}
                  endTime={new Date(obj.end.local).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                  status={obj.status}
                  description={obj.description.html}
                  link={obj.url}
                  img={obj.logo ? obj.logo.original.url : NO_IMAGE.src}
                  eventId={obj.id ? obj.id : null}
                  shareable={obj.shareable ? obj.shareable : null}
                  isMember={isMember}
                  address={accountData?.address}
                />
              </Box>
            </div>
          ))
          .reverse()}
      </Box>
    </Layout>
  );
};

export default EventsPage;
