import { FC } from "react";

import { Text, Icon, Image, BoxProps, Box, Center, VStack } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";

import { HiCheckCircle, HiOutlineCheckCircle } from "react-icons/hi";
import { RiMovie2Fill } from "react-icons/ri";

export type MovieInfo = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export interface MovieProps extends BoxProps {
  info: MovieInfo;
  isSelected: boolean;
  isSelectable: boolean;
  onToggle: () => void;
}

const Movie: FC<MovieProps> = ({ info, isSelectable, isSelected, onToggle }) => {
  const theme = useTheme();
  const { Poster, Year, Title } = info;
  const backdropProps = {
    bg: transparentize("gray.900", 0.7)(theme),
    opacity: 1,
    backdropFilter: "blur(3px)",
  };

  return (
    <VStack p={[2, 4]} >
      <Box pos="relative">
        {Poster !== 'N/A'
          ? <Image w={48} h={[56, 72]} src={Poster} boxShadow="lg" objectFit="cover" alt={Title + ' Poster'} />
          : (<Box w={['9.1rem', 48]} h={[56, 72]} d='flex' alignItems='center' justifyContent='center' bg='gray.700'>
              <Icon as={RiMovie2Fill} color={"pink.300"} boxSize={12} />
            </Box>)
        }
        <Center
          pos="absolute"
          inset={0}
          cursor={isSelected || isSelectable ? "pointer" : "not-allowed"}
          transitionDuration="150ms"
          transitionTimingFunction="ease-in-out"
          bg="transparent"
          opacity={0}
          _hover={backdropProps}
          {...(isSelected ? backdropProps : {})}
          onClick={() => {
            if (isSelected || isSelectable) {
              onToggle();
            }
          }}
        >
          <VStack>
            <Icon
              as={isSelected ? HiCheckCircle : HiOutlineCheckCircle}
              color={isSelected ? "green.300" : "pink.300"}
              boxSize={12}
            />
            <Text fontSize="lg" fontWeight="semibold" color="white">
              {isSelected ? "Nominated :)" : "Nominate!"}
            </Text>
          </VStack>
        </Center>
      </Box>
      <VStack spacing={0}>
        <Text fontWeight={600} fontSize={['sm', 'md']} noOfLines={1} color="gray.100">
          {Title}
        </Text>
        <Text fontSize={['xs', 'sm']} color="gray.400">
          {Year}
        </Text>
      </VStack>
    </VStack>
  );
};

export default Movie;
