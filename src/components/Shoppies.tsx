import { FC, useState } from "react";

import { BoxProps, Box, VStack, Container, Button, useDisclosure } from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Icon } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import ReactPaginate from 'react-paginate';
import uniqBy from "lodash/uniqBy";
import axios from "axios";

import Header from './Header';
import SearchBar from "./SearchBar";
import SearchResults from './SearchResults';
import { MovieInfo } from "./Movie";
import Nominations from './Nominations';

interface ShoppiesProps extends BoxProps {}

const Shoppies: FC<ShoppiesProps> = ({ children }) => {
  const [searchedMovies, setSearchedMovies] = useState<MovieInfo[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<MovieInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const { isOpen, onToggle } = useDisclosure();

  // Request made when pagenation buttons are clicked
  const fetchPage = async (page: number) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://www.omdbapi.com", {
        params: {
          apikey: "acfd3ab0",
          type: "movie",
          s: query,
          page: page
        },
      });
      const { Response, Search, Error } = data;
      if (Response === 'True') {
        setSearchedMovies(uniqBy<MovieInfo>(Search, "imdbID"));
        setError('');
      } else {
        setError(Error);
      }
    } catch (error) {
      setError('Oops, your network request has failed :(')
    } finally {
      setIsLoading(false);
    }
  };

  // For clicks on the movies in search results
  const handleMovieToggle = (info: MovieInfo, isSelected: boolean) => {
    setSelectedMovies(
      isSelected
        ? selectedMovies.filter(
            (movie) => movie.imdbID !== info.imdbID
          )
        : [...selectedMovies, info]
    );
  }

  // For clicks on the movies in the nomination list
  const handleNominationClick = (info: MovieInfo) => {
    setSelectedMovies(
      selectedMovies.filter(
        (movie) => movie.imdbID !== info.imdbID
      )
    );
  }

  return (
    <VStack align="stretch" h="100vh" overflowX='hidden' bg='gray.900'>
      <Box flex={1} overflowY="scroll" bg="gray.900">
        <Header />
        <Container maxW="container.xl" alignSelf="center" minH={['70vh', '50vh']} d='flex' flexDirection='column' position='relative'>
          {/* Notification Banner */}
          {selectedMovies.length === 5 &&
            <Alert position='fixed' zIndex='3' w='100vw' status="success" top='0px' left='0px'>
              <Container maxW="container.xl" d='flex' flexDirection={['column', 'column', 'row']} alignItems='center'>
                <AlertIcon />
                <AlertTitle mr={2}>You have selected the maximum number of nominations!</AlertTitle>
                <AlertDescription>Unselect some of your current selections to nominate more.</AlertDescription>
              </Container>
            </Alert>
          }
          <VStack align="stretch" spacing={8}>
            <SearchBar
              isLoading={isLoading}
              onLoading={setIsLoading}
              onResults={(q, maxP, results) => {
                setSearchedMovies(results);
                setQuery(q);
                setMaxPage(maxP);
              }}
              onErrors={(error) => setError(error)}
            />
            <SearchResults
              selectedMovies={selectedMovies}
              searchedMovies={searchedMovies}
              error={error}
              onToggle={handleMovieToggle}
            />
            <Box color='white' display='flex' w='fit-content' maxW='100%' justifyContent='center' alignSelf='center' marginBottom='4rem !important' fontSize='sm'>
              <ReactPaginate
                previousLabel={<Icon as={MdKeyboardArrowLeft} color={"pink.300"} boxSize={[6, 8]}/>}
                nextLabel={<Icon as={MdKeyboardArrowRight} color={"pink.300"} boxSize={[6, 8]}/>}
                breakLabel={<Icon as={HiOutlineDotsHorizontal} color={"white"} boxSize={5}/>}
                breakClassName={'break-me'}
                pageCount={maxPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(data) => {fetchPage(data.selected+1)}}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
            </Box>
          </VStack>
          <Box w='100%' borderBottom='4px' borderBottomColor='pink.300' position='fixed' bottom={isOpen? '19rem' : '0'} left='0' transition='all ease 0.25s'>
            <Container maxW="container.xl" display='flex' justifyContent='flex-end'>
              <Button bg='pink.300' size="lg" onClick={onToggle}  fontSize={['16', '20']} borderTopRadius='12' borderBottomRadius='0'>
                Your nominations
              </Button>
            </Container>
          </Box>
        </Container>
      </Box>
      <Nominations 
        selectedMovies={selectedMovies}
        onNominationToggle={handleNominationClick}
        isOpen={isOpen}
      />
    </VStack>
  );
};

export default Shoppies;
