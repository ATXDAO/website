import { useState } from "react";
import Card from "../../Card";
import { Heading, Flex, Text, Link, Box } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

function PopLink(props){
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Link 
            href={props.link}
            target="_blank"
            cursor="default"
        >
            <Card 
                outline 
                maxWidth="55rem"
                _hover={{
                    cursor: "pointer",
                    backgroundColor: "#252b38",
                    borderColor: "#ff8330"
                }}
                onMouseEnter={() => {
                    setTimeout(() => {
                        setIsHovering(true)
                    }, 25)
                }}
                onMouseLeave={() => {
                    setTimeout(() => {
                        setIsHovering(false)
                    }, 25)
                }}
            >
                <Heading 
                    variant="pop"
                    maxWidth="43rem"
                >
                    {props.heading}
                </Heading>
                <Flex justifyContent="space-between" mt="2">
                    <Text fontSize="2xl" maxWidth="40rem">
                        {props.description}
                    </Text>
                    <FaArrowRight 
                        fontSize="60px" 
                        color={isHovering ? "#ff8330" : "white"}
                    />
                </Flex>
            </Card>
        </Link>
    )
}

export default PopLink;