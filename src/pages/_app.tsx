import 'bootstrap/dist/css/bootstrap.min.css'
import '@src/styles/global.css'

import React from 'react'
import { Router } from 'next/router'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'

import { LanguageProvider } from '../context/LanguageContext'
import { store } from '../redux'

Router.events.on('routeChangeComplete', (url) => {
  if (typeof window.gtag === 'undefined') {
    return
  }
  window.gtag('config', process.env.GA_TRACKING_ID, {
    page_location: url
  })
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <LanguageProvider lang={pageProps.lang}>
        <Component {...pageProps} />
      </LanguageProvider>
    </Provider>
  )
}

export default App
