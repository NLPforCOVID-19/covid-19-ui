import React from 'react'

import Layout from '../components/Layout'
import { useLangageRedirect } from '../utils'

const IndexPage = () => {
  useLangageRedirect('/')
  return <Layout />
}

export default IndexPage
