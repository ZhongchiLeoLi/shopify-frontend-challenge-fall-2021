import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react"  
import "@fontsource/montserrat"

import Shoppies from "./components/Shoppies";

const theme = extendTheme({
  styles:{
    global: {
      body: {
        fontFamily: "Montserrat",
      }
    }
  }
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Shoppies />
    </ChakraProvider>
  );
}

export default App;
