import {
  Box,
  Grid,
  Heading,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { SocialLinks } from 'components/social-links';
import { UkraineMintForm } from 'components/ukraine-mint-form';
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  return (
    <Layout title="atxdao">
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} mt="5vh">
          <VStack spacing={[4, 4, 8]}>
            <Heading>ATX ❤️ Ukraine NFT</Heading>
            <Text>
              100% of proceeds sent{' '}
              <Link
                href="https://twitter.com/Ukraine/status/1497594592438497282?s=20&t=pjoN6IY5Jkghkjvplc75sw"
                target="_blank"
                textDecoration="underline"
              >
                directly
              </Link>{' '}
              to Ukraine
            </Text>
            <UkraineMintForm />
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
  );
};

export default IndexPage;
