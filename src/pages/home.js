import { Parallax } from 'react-scroll-parallax';
import Layout from "../components/layout/Layout";
import { Heading, Text, Center, Box } from "@chakra-ui/react";
import { Logo } from "../img/logo";
import Team from '../components/home/team/Team';
import ImportantLinks from '../components/home/links/ImportantLinks';

function Home() {
  const contentPaddingX = ["1rem", "2rem", "3rem", "10rem"];
  const contentPaddingY = "5rem"

  return (
    <Layout>
      <Center 
        flexDirection="column"
        gap="2rem"
        height={["96vh", "94vh", "92vh"]} // subtract by 4 to get window height
      >
        <Parallax y={[-20, 20]} tagouter="figure">
          <Heading 
            fontSize="6xl" 
            fontWeight="900"
            textShadow="5px 5px 15px rgba(0,0,0,0.25)"
          >
            ATX DAO
          </Heading>
        </Parallax>
        <Parallax y={[-20, 20]} tagouter="figure">
          <Logo
            boxSize={['256px', '256px', '384px']}
            fill={'gray.100'}
          />
        </Parallax>
        <Text 
          fontSize="3xl"
          textShadow="5px 5px 15px rgba(0,0,0,0.25)"
        >
          Austin on-chain.
        </Text>
      </Center>

      <Box 
        bg="white" 
        color="black" 
        paddingX={contentPaddingX} 
        paddingY={contentPaddingY}
      >
        <Text textAlign="center" fontSize="xl">
          ATX DAO is a city DAO working to unite Austin&apos;s crypto communities, 
          to enable artists and local businesses to participate in the crypto ecosystem, 
          and to educate the government about the benefits of Web3. 
          As a democratic group of crypto enthusiasts building a cohesive network of developers, 
          artists, investors, and crypto professionals, the DAO organizes social events, 
          provides support to the local community, and assists in the creation of new web3 
          projects. 25 &apos;Genesis&apos; members, the holders of 25 unique NFTs, currently compose 
          the voting body of the DAO.
        </Text>
      </Box>

      <Box paddingX={contentPaddingX} paddingY={contentPaddingY}>
        <ImportantLinks />
      </Box>

      <Box paddingX={contentPaddingX}>
        <Heading 
          fontSize="4xl" 
          fontWeight="900"
          textAlign="center"
        >
          Team
        </Heading>
        <Team />
      </Box>
    </Layout>
  )
}

export default Home;
