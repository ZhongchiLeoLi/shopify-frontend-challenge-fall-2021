import { FC } from "react";

import { BoxProps, Box, Center, VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text, Icon } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";

import { RiMovie2Fill, RiDeleteBin6Fill } from "react-icons/ri";

import { MovieInfo } from "./Movie";

export interface MovieProps extends BoxProps {
  info: MovieInfo;
  onClick: () => void;
}

const NominatedMovie: FC<MovieProps> = ({ info, onClick }) => {
  const theme = useTheme();
  const { Poster, Year, Title } = info;
  const backdropProps = {
    bg: transparentize("gray.900", 0.7)(theme),
    opacity: 1,
    backdropFilter: "blur(3px)",
  };
  return (
    <VStack p={[2, 4]} maxW='44'>
      <Box pos="relative">
        {Poster !== 'N/A'
          ? <Image minW={[32, 32, 36]} h={[48, 48, 52]} src={Poster} boxShadow="lg" objectFit="cover" alt={Title + ' Poster'} />
          : (<Box minW={[32, 32, 36]} h={[48, 48, 52]} d='flex' alignItems='center' justifyContent='center' bg='gray.800'>
              <Icon as={RiMovie2Fill} color={"pink.300"} boxSize={12} />
            </Box>)
        }
        <Center
          pos="absolute"
          inset={0}
          cursor={"pointer"}
          transitionDuration="150ms"
          transitionTimingFunction="ease-in-out"
          bg="transparent"
          opacity={0}
          _hover={backdropProps}
          onClick={onClick}
        >
          <VStack>
            <Icon
              as={RiDeleteBin6Fill}
              color={"pink.300"}
              boxSize={10}
            />
            <Text fontSize="lg" fontWeight="semibold" color="white">
              {"Remove"}
            </Text>
          </VStack>
        </Center>
      </Box>
      <VStack spacing={0}>
        <Text fontWeight={600} fontSize={['sm', 'md']} noOfLines={1} color="gray.100">
          {Title}
        </Text>
        <Text fontSize={['xxs', 'xs']} color="gray.400">
          {Year}
        </Text>
      </VStack>
    </VStack>
  );
};

export default NominatedMovie;
