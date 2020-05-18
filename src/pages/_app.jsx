import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@src/styles/global.css'

import { Provider, fetchMeta, loadAllTopicsNews, StoreContext } from '../store'

Router.events.on('routeChangeComplete', (url) => {
  if (typeof window.gtag === 'undefined') {
    return
  }
  window.gtag('config', process.env.GA_TRACKING_ID, {
    page_location: url
  })
})

const AppWithDispach = ({ Component, pageProps }) => {
  const [state, dispatch] = useContext(StoreContext)
  useEffect(() => {
    dispatch(fetchMeta())
  }, [])
  useEffect(() => {
    if (state.metaLoaded) {
      dispatch(loadAllTopicsNews())
    }
  }, [state.metaLoaded])
  return (
    <Component {...pageProps} />
  )
}

function App({ Component, pageProps }) {
  return (
    <Provider>
      <AppWithDispach Component={Component} pageProps={pageProps} />
    </Provider>
  )
}

export default App
