import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { NextPage } from 'next';

export const ComingSoonPage: NextPage = () => {
  return (
    <Layout title="coming soo">
      <Box textAlign="center" py={10} px={6}>
        <WarningTwoIcon boxSize="50px" color="orange.300" />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Coming Soon
        </Heading>
        <Text color="gray.500">Currently under construction.</Text>
      </Box>
    </Layout>
  );
};
export default ComingSoonPage;
