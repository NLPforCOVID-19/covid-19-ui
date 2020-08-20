import React from 'react'
import Router from 'next/router'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@src/styles/global.css'

import { Provider } from '../store'
import { LanguageProvider } from '../context/LanguageContext'

Router.events.on('routeChangeComplete', (url) => {
  if (typeof window.gtag === 'undefined') {
    return
  }
  window.gtag('config', process.env.GA_TRACKING_ID, {
    page_location: url
  })
})

const AppWithDispach = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

function App({ Component, pageProps }) {
  return (
    <LanguageProvider lang={pageProps.lang}>
      <Provider>
        <AppWithDispach Component={Component} pageProps={pageProps} />
      </Provider>
    </LanguageProvider>
  )
}

export default App
