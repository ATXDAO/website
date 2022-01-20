import { VStack, Box, Container } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { NextPage } from 'next';
import Head from 'next/head';
import { useAccount } from 'wagmi';

const EventPage: NextPage = () => {
  const [{ data: accountData }] = useAccount();

  return (
    <>
      <Box className="pyro">
        <Box className="before" />
        <Box className="after" />
      </Box>
      <Layout title="atxdao" connected={!!accountData}>
        <Head>
          <link rel="stylesheet" href="/css/fireworks.css" />
        </Head>
        <Container width="100%" height="100%">
          <VStack>
            <Box width="500px" height="500px">
              Event page
            </Box>
          </VStack>
        </Container>
      </Layout>
    </>
  );
};

export default EventPage;
