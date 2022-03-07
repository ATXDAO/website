import { LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
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
import { SupportedNetwork, ukraineContractByNetwork } from 'util/constants';
import { useNetwork } from 'wagmi';

const IndexPage: NextPage = () => {
  const [{ data: networkData }] = useNetwork();
  const networkName = (networkData.chain?.name || 'mainnet').toLowerCase();
  const { address: contractAddress, blockExplorer } =
    ukraineContractByNetwork[networkName as SupportedNetwork];
  return (
    <Layout title="atx ❤️ ukraine NFT">
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} mt="5vh">
          <VStack spacing={[4, 4, 8]}>
            <Heading>Austin ❤️ Ukraine NFT</Heading>
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
            <Box>
              <Button
                rightIcon={<LinkIcon />}
                as="a"
                size="md"
                ml={2}
                target="_blank"
                href={`${blockExplorer}/address/${contractAddress}`}
              >
                Verified Contract
              </Button>
              <Button
                rightIcon={<LinkIcon />}
                as="a"
                size="md"
                ml={2}
                target="_blank"
                href="https://opensea.io/collection/atx-loves-ukr"
              >
                Opensea Collection
              </Button>
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
  );
};

export default IndexPage;
