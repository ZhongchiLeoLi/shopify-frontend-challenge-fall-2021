import { FC } from "react";

import { BoxProps, Box, VStack, HStack, Center, Container, Collapse, Icon } from "@chakra-ui/react";
import { RiMovie2Line } from "react-icons/ri";
import { MovieInfo } from "./Movie";
import NominatedMovie from './NominatedMovie';

interface NominationsProps extends BoxProps {
  selectedMovies: MovieInfo[];
  onNominationToggle: (info: MovieInfo) => void;
  isOpen: boolean;
}

const Nominations: FC<NominationsProps> = ({ selectedMovies, onNominationToggle, isOpen }) => {
  // Function that returns an array with specific length to help generate placeholders
  const availableSpots = (): number[] => {
    let spots:number[] = new Array(5 - selectedMovies.length);
    spots.fill(0);
    return spots;
  }

  return (
    <Box w='100vw' top='-45px'>
      <Collapse in={isOpen} animateOpacity>
        <Box w='100vw' bg="gray.700" overflowX={['scroll', 'scroll', 'hidden']}>
          <Container h="19rem" maxW="container.xl">
            <HStack h='100%' justifyContent={['', '', 'space-around']} alignContent={['start', 'center']}>
              {/* Display nominated movies */}
              {selectedMovies?.map((info) => {
                const { imdbID } = info;
                return (
                  <Center key={imdbID}>
                    <NominatedMovie
                      key={imdbID}
                      info={info}
                      onClick={() => onNominationToggle(info)}
                    />
                  </Center>
                );
              })}
              {/* Display available spots as placeholders */}
              {selectedMovies.length < 5 &&
                (availableSpots().map((item, index) => {
                  return (
                    <Box key={`placeholder_${index}`} minW={[36, 36, 44]} h={[60, 60, 64]}  pos="relative" opacity='60%' >
                      <Center pos="absolute" inset={0} ml={[2, 4]} mr={[2, 4]} mb='12' bg='gray.800' >
                        <VStack>
                          <Icon as={RiMovie2Line} color={"pink.300"} boxSize={12} />
                        </VStack>
                      </Center>
                    </Box>
                  );
                }))
              }
            </HStack>
          </Container>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Nominations;
