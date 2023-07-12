import { Box, Grid, useColorModeValue, VStack } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { MintForm } from 'components/mint-form';
import { SocialLinks } from 'components/social-links';
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  return (
    <Layout title="atxdao">
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} mt="5vh">
          <VStack spacing={[4, 4, 8]}>
            <Box>
              <MintForm />
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
