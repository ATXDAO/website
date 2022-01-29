import { Box, Grid, Link } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import Product from "../components/store/Product";
import { storeData } from "../util/mockData";

function Store() {
    const contentPaddingX = ["1rem", "2rem", "3rem", "10rem"];
    const contentPaddingY = "3rem";

    return (
        <Layout>
            <Box 
                paddingX={contentPaddingX}
                paddingTop={contentPaddingY}
            >
                <Grid
                    gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}
                    gap={["1rem", "2rem"]}
                >
                    {storeData.map((obj) => (
                        <Link 
                            key={obj.id}
                            href="#"
                            target="_blank"
                        >
                            <Product
                                name={obj.name}
                                img={obj.img}
                                price={obj.price}
                                description={obj.description}
                            />
                        </Link>
                    ))}
                </Grid>
            </Box>
        </Layout>
    )
}

export default Store;