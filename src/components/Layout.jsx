import React from 'react'
import Head from 'next/head'

import meta from '../meta'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ title, children }) => (
  <div className="wrap">
    <Head>
      <title>{title || meta.title}</title>
      <meta name="description" content={meta.desc} />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet" />
    </Head>
    <Header />
    <div className="children">{children}</div>
    <Footer />
    <style jsx>{`
      .wrap {
        min-height: 100vh;
        display: flex;
        flex-flow: column nowrap;
      }
      .children {
        flex: 1 1 auto;
      }
    `}</style>
  </div>
)

export default Layout
