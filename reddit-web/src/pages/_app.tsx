import { ChakraProvider } from '@chakra-ui/react'

import { AppProps } from 'next/app'
import { NavBar } from '../components/NavBar'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <NavBar />
      </ChakraProvider>
    </>
  )
}

export default MyApp
