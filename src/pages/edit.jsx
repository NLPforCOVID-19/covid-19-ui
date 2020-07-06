import React from 'react'

import Layout from '@src/components/Layout'
import NewsView from '@src/components/NewsView'

export default () => {
  return (
    <Layout>
      <NewsView showEditButton />
    </Layout>
  )
}
