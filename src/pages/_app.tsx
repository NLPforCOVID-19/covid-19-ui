import '@src/styles/bootstrap.scss'
import '@src/styles/global.css'
import '@src/styles/twitter.css'

import React from 'react'
import { Router } from 'next/router'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'

import { LanguageProvider } from '../context/LanguageContext'
import { store } from '../redux'

import { defaultLang } from '@src/translations'

Router.events.on('routeChangeComplete', (url) => {
  if (typeof window.gtag === 'undefined') {
    return
  }
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    page_location: url
  })
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    <LanguageProvider lang={pageProps.lang || defaultLang}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </LanguageProvider>
  )
}

export default App
