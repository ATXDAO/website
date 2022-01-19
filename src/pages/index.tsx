/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Box,
  Grid,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { Logo } from 'components/logo';
import { MintForm } from 'components/mint-form';
import { SocialLinks } from 'components/social-links';
import { SubscribeForm } from 'components/subscribe-form';
import { useAccount } from 'wagmi';

const IndexPage = () => {
  const [{ data: accountData }] = useAccount();

  return (
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
            {accountData?.address ? <MintForm /> : <SubscribeForm />}
          </VStack>
          <Spacer />
        </Grid>
      </Box>
    </Layout>
  );
};

export default IndexPage;
