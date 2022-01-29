import { Box, Divider, Link } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import Event from "../components/events/Event";
import { eventData } from "../util/mockData";

function Events() {
    const contentPaddingX = ["1rem", "2rem", "3rem", "10rem"];
    const contentPaddingY = "3rem";

    return (
        <Layout>
            <Box 
                paddingX={contentPaddingX}
                paddingTop={contentPaddingY}
            >
                
                {eventData.map((obj, i) => (
                    <>
                        {i !== 0 && (
                            <Divider 
                                mb={["2rem", "3rem", "5rem"]} 
                                borderBottomWidth="4px"
                                borderRadius="6px"
                            />
                        )}
                        <Box mb={["2rem", "3rem", "5rem"]}>
                            <Link href="#" target="_blank">
                                <Event 
                                    title={obj.title}
                                    date={obj.date}
                                    startTime={obj.startTime}
                                    endTime={obj.endTime}
                                    description={obj.desc}
                                    img={obj.img}
                                />
                            </Link>
                        </Box>
                    </>
                ))}
            </Box>
        </Layout>
    )
}

export default Events;