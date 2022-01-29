import { Box } from "@chakra-ui/react";

function Card({
    children, 
    bg, 
    color, 
    outline, 
    alignSelf, 
    maxWidth,
    padding,
    _hover,
    boxShadow,
    onMouseEnter,
    onMouseLeave
}){
    if(outline){
        return (
            <Box
                bg={bg || "transparent"}
                color={color || "#fff"}
                maxWidth={maxWidth}
                alignSelf={alignSelf}
                padding={padding || "2rem"}
                borderRadius="12px"
                border="6px solid #fff"
                transition="0.2s"
                _hover={_hover}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {children}
            </Box>
        )
    } else {
        return (
            <Box
                bg={bg || "#fff"}
                color={color || "#000"}
                padding={padding || "1rem"}
                transition="0.2s"
                _hover={_hover}
                alignSelf={alignSelf}
                borderRadius="12px"
                boxShadow={boxShadow || "5px 5px 15px 5px rgba(0,0,0,0.5)"}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {children}
            </Box>
        )
    }
}

export default Card;