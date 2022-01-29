import { Box, Center, Text } from "@chakra-ui/react";
import Image from "next/image";
import Card from "../../Card";

function Individual(props){
    return (
        <Card>
            <Center>
                <Box
                    bg="white"
                    borderRadius="50%"
                    minWidth="250px"
                    minHeight="250px"
                    backgroundImage={props.imgSrc}
                    backgroundPosition="center"
                />
            </Center>
            <Center 
                mt="6" 
                flexDirection="column"
            >
                <Text fontWeight="600">{props.position}</Text>
                <Text fontSize="xl">{props.name}</Text>
            </Center>
        </Card>
    )
}

export default Individual;