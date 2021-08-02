import { Box, Grid, Text, VStack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { SocialLinks } from 'components/social-links';
import { Layout } from '../components/Layout';

const IndexPage: FunctionComponent = () => (
  <Layout title="atxdao">
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3} mt="5vh">
        <VStack spacing={[6, 8]}>
          <Text fontSize={['3.2rem', '4rem', '5rem']} lineHeight={1}>
            atxdao
          </Text>
          <SocialLinks
            fontSize="4xl"
            spacing={4}
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

export default IndexPage;
