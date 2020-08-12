import React from 'react'
import Container from 'react-bootstrap/Container'

import Layout from '@src/components/Layout'
import Description from '@src/components/Description'
import Map from '@src/components/Map'
import NewsView from '@src/components/NewsView'

const Index = () => {
  return (
    <Layout>
      <Description />
      <Map />
      <NewsView />
      <Container>
        <div className="small text-right">
          <a className="text-muted" href="./edit/">
            編集 (管理者向け)
          </a>
        </div>
      </Container>
    </Layout>
  )
}

export default Index
