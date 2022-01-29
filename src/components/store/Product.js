import Card from "../Card";
import { Center, Box, Text, Flex } from "@chakra-ui/react";
import { limitChars } from "../../util/helpers";

function Product(props){
    return (
        <Card 
            padding="2rem" 
            boxShadow="2px 2px 6px 2px rgba(0,0,0,0.5)"
            _hover={{
                cursor: "pointer",
                transform: "scale(1.025)",
                backgroundColor: "#efefef"
            }}
        >
            <Center>
                <Box
                    bg="white"
                    borderRadius="12px"
                    minWidth="100%"
                    minHeight="300px"
                    backgroundImage={props.img}
                    backgroundSize="cover"
                    backgroundPosition="center"
                />
            </Center>
            <Flex 
                mt="6" 
                flexDirection="column"
            >
                <Text fontSize="2xl">{props.name}</Text>
                <Text 
                    fontWeight="600"
                    fontSize="0.9rem"
                >
                    {`$${props.price}`}
                </Text>
                <Text>{limitChars(props.description, 120)}</Text>
            </Flex>
        </Card>
    )
}

export default Product;