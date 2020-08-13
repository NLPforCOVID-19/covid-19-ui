import React from 'react'
import Container from 'react-bootstrap/Container'

import Layout from '@src/components/Layout'
import Description from '@src/components/Description'
import Map from '@src/components/Map'
import NewsView from '@src/components/NewsView'
import { useTranslation } from '../../context/LanguageContext'

const Index = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <Description />
      <Map />
      <NewsView />
      <Container>
        <div className="small text-right">
          <a className="text-muted" href="./edit/">
            {t('編集 (管理者向け)')}
          </a>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps(ctx) {
  const { lang } = ctx.params
  return {
    props: {
      locale: lang
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: ['en', 'ja'].map((lang) => ({ params: { lang } })),
    fallback: false
  }
}

export default Index
