import { Box, Grid, Link } from "@chakra-ui/react";
import PostPreview from "../components/blog/PostPreview";
import Layout from "../components/layout/Layout";
import { blogData } from "../util/mockData";

function Blog() {
    const contentPaddingX = ["1rem", "2rem", "3rem", "10rem"];
    const contentPaddingY = "3rem";

    return (
        <Layout>
            <Box 
                paddingX={contentPaddingX}
                paddingTop={contentPaddingY}
            >
                <Grid
                    gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}
                    gap={["1rem", "2rem"]}
                >
                    {blogData.map((obj) => (
                        <Link 
                            key={obj.id}
                            href="#"
                            target="_blank"
                        >
                            <PostPreview 
                                img={obj.img}
                                title={obj.title}
                                date={obj.date}
                                description={obj.desc}
                            />
                        </Link>
                    ))}
                </Grid>
            </Box>
        </Layout>
    )
}

export default Blog;