import { FC } from "react";

import { BoxProps, Text, SimpleGrid, Center} from "@chakra-ui/react";

import Movie, { MovieInfo } from "./Movie";

interface SearchResultsProps extends BoxProps {
  selectedMovies: MovieInfo[];
  searchedMovies: MovieInfo[];
  error: string;
  onToggle: (info: MovieInfo, isSelected: boolean) => void;
}

const SearchResults: FC<SearchResultsProps> = ({ searchedMovies, selectedMovies, error, onToggle }) => {
  return (
    error.length
    ? (<Text marginY='5rem !important' fontSize="xl" color='white'>{error}</Text>)
    : (<SimpleGrid columns={[2, 2, 3, 4, 5]} spacing={[0, 4]}> 
      {searchedMovies?.map((info) => {
        const { imdbID } = info;
        const isSelected = selectedMovies.some(
          (info) => info.imdbID === imdbID
        );
        return (
          <Center key={imdbID}>
            <Movie
              key={imdbID}
              info={info}
              isSelectable={selectedMovies.length < 5}
              isSelected={isSelected}
              onToggle={() => onToggle(info, isSelected)}
            />
          </Center>
        );
      })}
    </SimpleGrid>)
  );
};

export default SearchResults;
