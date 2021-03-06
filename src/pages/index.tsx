import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Grid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { Logo } from 'components/logo';
import { MintForm } from 'components/mint-form';
import { NextChakraLink } from 'components/next-chakra-link';
import { SocialLinks } from 'components/social-links';
import { SubscribeForm } from 'components/subscribe-form';
import { useIsMounted } from 'hooks/app-hooks';
import { NextPage } from 'next';
import { useAccount } from 'wagmi';

const IndexPage: NextPage = () => {
  const { data: accountData } = useAccount();
  const isMounted = useIsMounted();

  return (
    <>
      <NextChakraLink href="/ukraine">
        <Alert
          status="info"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          variant="solid"
        >
          <AlertIcon />
          <AlertTitle>Support Ukraine!</AlertTitle>
          <AlertDescription>Mint an ATX ❤️ UKR NFT</AlertDescription>
        </Alert>
      </NextChakraLink>
      <Layout title="atxdao">
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3} mt="5vh">
            <VStack spacing={[4, 4, 8]}>
              <Box>
                {isMounted && accountData ? (
                  <MintForm />
                ) : (
                  <>
                    <Text fontSize={['3.2rem', '4rem', '5rem']} lineHeight={1}>
                      ATX DAO
                    </Text>
                    <Logo
                      boxSize={['256px', '256px', '384px']}
                      fill={useColorModeValue('gray.800', 'gray.100')}
                    />
                    <SubscribeForm />
                  </>
                )}
              </Box>
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
            </VStack>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default IndexPage;
