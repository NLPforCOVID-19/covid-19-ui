import React, { useContext, useEffect } from 'react'
import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'

import { Provider, fetchMeta, loadAllTopicsNews, StoreContext } from '../store'

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
    <>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
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
