import { FC } from "react";

import { BoxProps, Box, Container, HStack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import "@fontsource/montserrat"

interface HeaderProps extends BoxProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <Box
        pos="relative"
        bgImage="url(https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)"
        bgSize="cover"
        bgPosition="center"
    >
        <Box bgGradient="linear(to-b, transparent, gray.900)">
        <Container maxH={['30vh', '50vh']} maxW="container.xl" py={[20, 40]}>
          <Heading size="4xl" fontWeight="600" color="white" fontFamily='Montserrat'>
            🍿Shoppies
          </Heading>
          <Heading py="5" size="md" fontWeight="400" color="gray.200" fontFamily='Montserrat'>
            Pick your top 5 favourite movies for nomination
          </Heading>
        </Container>
        </Box>
    </Box>
  );
};

export default Header;
