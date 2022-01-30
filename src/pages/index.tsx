import { Parallax } from 'react-scroll-parallax';
import Layout from '../components/layout/Layout';
import {
  Heading,
  Center,
  Box,
  Grid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import Team from '../components/home/team/Team';
import { SubscribeForm } from 'components/subscribe-form';
import { Logo } from 'components/logo';
import { SocialLinks } from 'components/social-links';
import ImportantLinks from '../components/home/links/ImportantLinks';
import { useAccount } from 'wagmi';

function Home() {
  const contentPaddingX = ['1rem', '2rem', '3rem', '10rem'];
  const contentPaddingY = '5rem';
  const [{ data: accountData }] = useAccount();

  return (
    <Layout title="atxdao" connected={!!accountData}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} mt="5vh">
          <VStack spacing={[4, 4, 8]}>
            {accountData ? (
              <MintForm />
            ) : (
              <>
                <Logo
                  boxSize={['256px', '256px', '384px']}
                  fill={useColorModeValue('gray.800', 'gray.100')}
                />
                <Text fontSize={['3.2rem', '4rem', '5rem']} lineHeight={1}>
                  ATXDAO
                </Text>
                <SubscribeForm />
              </>
            )}
          </VStack>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Home;
