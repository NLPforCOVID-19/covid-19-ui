import React from 'react'
import Container from 'react-bootstrap/Container'

import Layout from '@src/components/Layout'
import Description from '@src/components/Description'
import Map from '@src/components/Map'
import NewsView from '@src/components/NewsView'
import { useTranslation } from '@src/context/LanguageContext'
import { languagePaths } from '../../utils'

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
      lang
    }
  }
}

export async function getStaticPaths() {
  console.log(languagePaths)
  return {
    paths: languagePaths,
    fallback: false
  }
}

export default Index
