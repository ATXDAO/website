import { Box, Grid, Icon, Link, Stack, Text, VStack } from '@chakra-ui/react';
import { ElementType, FunctionComponent } from 'react';
import { SiGithub } from 'react-icons/si';
import { Layout } from '../components/Layout';

const SocialLink: FunctionComponent<{
  href: string;
  label: string;
  text: string;
  icon: ElementType;
}> = ({ href, label, text, icon }) => (
  <Link href={href}>
    <Icon as={icon} aria-label={label} mr={1} pb="2px" />
    {text}
  </Link>
);

const IndexPage: FunctionComponent = () => (
  <Layout title="atxdao">
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3} mt="5vh">
        <VStack spacing={[3, 4]}>
          <Text fontSize={['3.2rem', '4rem', '5rem']} lineHeight={1}>
            atxdao
          </Text>
          <Text pr={3} pt={2}>
            contact us:
          </Text>
          <Stack textAlign="left">
            <SocialLink
              href="https://github.com/atxdao"
              icon={SiGithub}
              text="atxdao"
              label="github"
            />
          </Stack>
        </VStack>
      </Grid>
    </Box>
  </Layout>
);

export default IndexPage;
