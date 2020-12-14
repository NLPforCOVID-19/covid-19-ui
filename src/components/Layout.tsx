import React, { memo } from 'react'
import Head from 'next/head'

import { useTranslation } from '../context/LanguageContext'

import { Header } from './Header'
import { Footer } from './Footer'

export const Layout: React.FC<{ title?: string }> = memo(({ title, children }) => {
  const { t } = useTranslation()
  return (
    <div className="wrap">
      <Head>
        <title>{title || t('title')}</title>
        <meta name="description" content={t('description')} />
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
})
Layout.displayName = 'Layout'
