import { Box, Flex, Heading, Text, transform } from "@chakra-ui/react";
import Card from "../Card";
import { limitChars } from "../../util/helpers";

function PostPreview(props) {
    return (
        <Card 
            outline
            _hover={{
                cursor: "pointer",
                backgroundColor: "#252b38",
                borderColor: "#ff8330",
                color: "#ff8330",
                transform: "scale(1.025)"
            }}
        >
            <Flex 
                flexDirection="column"
                gap="1rem"
            >
                <Box
                    bg="white"
                    borderRadius="6px"
                    minWidth="100%"
                    minHeight="200px"
                    backgroundImage={props.img}
                    backgroundSize="cover"
                    backgroundPosition="center"
                />
                <Box>
                    <Heading fontSize="lg">{props.title}</Heading>
                    <Text 
                        fontSize="sm" 
                        mb="2"
                        color="white"
                    >
                        {props.date}
                    </Text>
                    <Text color="white">{limitChars(props.description, 120)}</Text>
                </Box>
            </Flex>
        </Card>
    )
}

export default PostPreview;