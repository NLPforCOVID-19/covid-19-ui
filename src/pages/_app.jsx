import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from '../store'
import { MetaContext, fetchMeta } from "../store/meta";

const AppWithDispach = ({ Component, pageProps }) => {
  const [_, metaDispatch] = useContext(MetaContext)
  useEffect(() => {
    metaDispatch(fetchMeta())
  }, [])
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
