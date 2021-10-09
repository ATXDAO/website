import {
  Box,
  Grid,
  Text,
  Spacer,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { SocialLinks } from 'components/social-links';
import { Logo } from 'components/logo';
import { Layout } from 'components/layout';
import { SubscribeForm } from 'components/subscribe-form';
import useEagerConnect from "../hooks/useEagerConnect";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import { useWeb3React } from "@web3-react/core";


const IndexPage = () => {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();
  const isConnected = typeof account === "string" && !!library;

  return (
    <Box>
      <Account triedToEagerConnect={triedToEagerConnect} />
    <Layout title="atxdao">
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} mt="5vh">
          <VStack spacing={[4, 4, 8]}>
            
            <Text fontSize={['3.2rem', '4rem', '5rem']} lineHeight={1}>
              ATX DAO
            </Text>
            <Logo
              boxSize={['256px', '256px', '384px']}
              fill={useColorModeValue('gray.800', 'gray.100')}
            />
            <SocialLinks
              fontSize={['2rem', '2rem', '3rem']}
              color={useColorModeValue('gray.800', 'gray.100')}
              spacing={[2, 2, 4]}
              socialLinks={[
                {
                  social: 'discord',
                  href: 'https://discord.gg/3uGPbZhk3U',
                },
                {
                  social: 'github',
                  href: 'https://github.com/atxdao',
                },
              ]}
            />
            <SubscribeForm />
          </VStack>
          <Spacer />
        </Grid>
      </Box>
    </Layout>
    </Box>
  );
}

export default IndexPage;
