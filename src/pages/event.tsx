import { VStack, Box, Container } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { useFireworks } from 'hooks/app-hooks';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const EventPage: NextPage = () => {
  const [{ data: accountData }] = useAccount();
  const [, setFireworks] = useFireworks();

  useEffect(() => {
    setFireworks(true);
  });

  return (
    <Layout title="atxdao" connected={!!accountData} canToggleHeader>
      <Container width="100%" height="100%">
        <VStack>
          <Box width="500px" height="500px">
            Event page
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default EventPage;
