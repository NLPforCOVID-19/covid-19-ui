import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'

import { fetchMeta, loadAllTopicsNews, StoreContext } from '@src/store'
import Layout from '@src/components/Layout'
import Description from '@src/components/Description'
import Map from '@src/components/Map'
import NewsView from '@src/components/NewsView'
import { useTranslation } from '@src/context/LanguageContext'
import { languagePaths } from '../../utils'

const Index = () => {
  const { t, lang } = useTranslation()
  const [state, dispatch] = useContext(StoreContext)
  useEffect(() => {
    dispatch(fetchMeta(lang))
  }, [])
  useEffect(() => {
    if (state.metaLoaded) {
      dispatch(loadAllTopicsNews(lang))
    }
  }, [state.metaLoaded])
  return (
    <Layout>
      <Description />
      <Map />
      <NewsView />
      <Container>
        <div className="small text-right">
          <a className="text-muted" href="./edit/">
            {t('編集')}
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
  return {
    paths: languagePaths,
    fallback: false
  }
}

export default Index
