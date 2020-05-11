import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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
  return <Component {...pageProps} />
}

function App({ Component, pageProps }) {
  return (
    <Provider>
      <AppWithDispach Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default App;
