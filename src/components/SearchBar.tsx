import { FC, useState, useEffect } from "react";

import { BoxProps, Icon, Spinner, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";

import { useDebounce } from "use-debounce";
import axios from "axios";
import uniqBy from "lodash/uniqBy";
import { MovieInfo } from "./Movie";

interface SearchBarProps extends BoxProps {
  isLoading: boolean;
  onLoading: (isLoading: boolean) => void;
  onResults: (q: string, maxP: number, results: MovieInfo[]) => void;
  onErrors: (error: string) => void;
}


const SearchBar: FC<SearchBarProps> = ({isLoading, onLoading, onResults, onErrors }) => {
  const [value, setValue] = useState("");
  const [query] = useDebounce(value, 700);

  useEffect(() => {
    const searchMovies = async (q: string) => {
      onLoading(true);
      try {
        const { data } = await axios.get("http://www.omdbapi.com", {
          params: {
            apikey: "acfd3ab0",
            type: "movie",
            s: q,
          },
        });
        const { Response, Search, Error, totalResults } = data;
        if (Response === 'True') {
          onErrors('');
          onResults(q, Math.ceil(parseInt(totalResults)/10), uniqBy<MovieInfo>(Search, "imdbID"));
        } else {
          const error = Error === 'Too many results.' ? Error + ' Try searching a more specific term.' : Error + ' Try searching another movie name.'
          onErrors(error);
        }
      } catch (error) {
        onErrors('Oops, your network request has failed :(');
      } finally {
        onLoading(false);
      }
    };

    if (query.trim().length) {
      searchMovies(query);
    } else {
      onErrors('Type in the search bar above to find your favourite movies!');
      onResults('', 1, []);
    }
  }, [query, onErrors, onLoading, onResults]);

  return (
    <InputGroup size="lg" >
      <InputLeftElement>
        <Icon as={HiOutlineSearch} boxSize={6} color="pink.400" />
      </InputLeftElement>
      <Input
        placeholder="Search movies"
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        bg="gray.700"
        borderColor="pink.200"
        color='white'
      />
      {isLoading && (
        <InputRightElement>
          <Spinner color="pink.300" size="sm" />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchBar;
