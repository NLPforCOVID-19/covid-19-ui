import React from 'react'

import Layout from '../components/Layout'

import { useLanguageRedirect } from '@src/context/LanguageContext'

const IndexPage = () => {
  useLanguageRedirect('/')
  return <Layout />
}

export default IndexPage
