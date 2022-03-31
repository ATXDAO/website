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
import { formatEther } from '@ethersproject/units';
import { Layout } from 'components/layout';
import { SocialLinks } from 'components/social-links';
import { UkraineMintForm } from 'components/ukraine-mint-form';
import { ATXDAOUkraineNFT } from 'contracts/types';
import { BigNumber } from 'ethers';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { shortenAddress } from 'utils';
import {
  SupportedNetwork,
  ukraineContractByNetwork,
  UKRAINE_ETH_ADDRESS,
} from 'utils/constants';
import { useBlockNumber, useContract, useNetwork, useProvider } from 'wagmi';

if (typeof window !== 'undefined') {
  window.localStorage.ens = window.localStorage.ens || {};
}

interface NftOwner {
  address: string;
  ens?: string;
  tier: number;
  value: BigNumber;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const UKRAINE_NFT_ABI = require('../contracts/ATXDAOUkraineNFT.json');

const IndexPage: NextPage = () => {
  const [{ data: networkData }] = useNetwork();
  const provider = useProvider();
  const networkName = (networkData.chain?.name || 'mainnet').toLowerCase();
  const { address: contractAddress, blockExplorer } =
    ukraineContractByNetwork[networkName as SupportedNetwork];
  const mintContract = useContract<ATXDAOUkraineNFT>({
    addressOrName: contractAddress,
    contractInterface: UKRAINE_NFT_ABI,
    signerOrProvider: provider,
  });

  const [{ data: blockNumber }] = useBlockNumber({
    watch: true,
  });

  const [totalDonated, setTotalDonated] = useState<BigNumber | undefined>();
  const [nftOwners, setNftOwners] = useState<NftOwner[]>([]);

  useEffect(() => {
    mintContract
      .totalDonated(UKRAINE_ETH_ADDRESS)
      .then((total) => setTotalDonated(total));
  }, [blockNumber]);

  useEffect(() => {
    mintContract.getOwners().then(([addresses, tiers, values]) => {
      setNftOwners(
        addresses.map((address, i) => ({
          address,
          tier: tiers[i].toNumber(),
          value: values[i],
        }))
      );
    });
  });

  const totalFormatted = totalDonated ? formatEther(totalDonated) : undefined;

  return (
    <Layout title="❤️ Ukraine NFT">
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="100% of proceeds sent directly to Ukraine."
        />
        <meta name="twitter:title" content="❤️ Ukraine NFT" />
        <meta name="twitter:site" content="@atxdao" />
        <meta
          name="twitter:image"
          content="https://mint.atxdao.com/img/ukraine/1.png"
        />
        <meta name="twitter:creator" content="@atxdao" />
        <meta property="og:title" content="❤️ Ukraine NFT" />
        <meta
          property="og:image"
          content="https://mint.atxdao.com/img/ukraine/1.png"
        />
      </Head>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} mt="5vh">
          <VStack spacing={[4, 4, 8]}>
            <Heading>❤️ Ukraine NFT</Heading>
            <Text>
              {totalDonated ? `${totalFormatted} ETH` : '100% of proceeds'} sent{' '}
              <Link
                href="https://etherscan.io/address/0x9c30bac4D3ADdBa39693aA4caDAe14449D60f795#internaltx"
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
            <VStack>
              {nftOwners.map(({ address, value }, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Text key={`${address}-${i}`}>
                  {shortenAddress(address)} donated {formatEther(value)} ETH
                </Text>
              ))}
            </VStack>
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
