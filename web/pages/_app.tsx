import '../public/css/styles.css'
import '../public/css/hishcharts.css'
import { AppProps } from 'next/app'
import { ReactElement } from 'react'

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}