import { AppProps } from 'next/app'
import { usePostsQuery } from '../generated/graphql'
// import theme from '../theme'

import "../styles/global.scss"

function MyApp({ Component, pageProps }: AppProps) {
  const [{ data }] = usePostsQuery()
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
