import { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { Grid, Heading, Flex, Text, Box } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import Card from '../../Card';
import PopLink from './PopLink';

function ImportantLinks(){
    // To control responsiveness in real time
    const [width, setWidth] = useState(900);
    useEffect(() => {
        setWidth(window.innerWidth);
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        }
    }, []);

    return (
        <Grid 
            marginY="12"
            gridTemplateColumns="1fr" 
            gap={["3rem", "5rem"]}
        >
            {width > 600 ? (
                <>
                    <Parallax x={[-15, 5]} tagouter="figure">
                        <PopLink 
                            heading="ATX DAO Open Sea Genesis Mint"
                            description="Collection of NFTs minted on opensea which granted membership to ATX DAO"
                            link=""
                        />
                    </Parallax>
                    <Parallax x={[15, -5]} tagouter="figure">
                        <PopLink 
                            heading="ATX DAO Blueprint Proposal"
                            description="ATX DAO charter document outlining our purpose and procedures"
                            link=""
                        />
                    </Parallax>
                    <Parallax x={[5, 25]} tagouter="figure">
                        <PopLink 
                            heading="ATX DAO voting with snapshot"
                            description="ATX DAO governance proposals"
                            link=""
                        />
                    </Parallax>
                </>
            ):(
                <>
                    <PopLink 
                        heading="ATX DAO Open Sea Genesis Mint"
                        description="Collection of NFTs minted on opensea which granted membership to ATX DAO"
                        link=""
                    />
                    <PopLink 
                        heading="ATX DAO Blueprint Proposal"
                        description="ATX DAO charter document outlining our purpose and procedures"
                        link=""
                    />
                    <PopLink 
                        heading="ATX DAO voting with snapshot"
                        description="ATX DAO governance proposals"
                        link=""
                    />
                </>
            )}
        </Grid>
    )
}

export default ImportantLinks;
