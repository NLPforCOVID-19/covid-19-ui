import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'

import Layout from '@src/components/Layout'
import Description from '@src/components/Description'
import Map from '@src/components/Map'
import NewsView from '@src/components/NewsView'
import { useTranslation } from '@src/context/LanguageContext'
import { languagePaths } from '../../utils'
import { fetchMeta, loadAllTopicsNews, StoreContext } from '@src/store'
import { SurveyToast } from '@src/components/SurveyToast'

const Index = () => {
  const { t, lang } = useTranslation()
  const [state, dispatch] = useContext(StoreContext)
  const [showToast, setShowToast] = useState(false)
  useEffect(() => {
    if (!state.metaLoaded) {
      dispatch(fetchMeta(lang))
    }
    if (state.metaLoaded) {
      dispatch(loadAllTopicsNews(lang))
    }
  }, [state.metaLoaded])
  useEffect(() => {
    if (state.metaLoaded) {
      setTimeout(() => {
        setShowToast(true)
      }, 5000)
    }
  }, [state.metaLoaded])
  return (
    <Layout>
      <SurveyToast show={showToast} onClose={() => setShowToast(false)} />
      <Description />
      <Map />
      <NewsView />
      <Container>
        <div className="small text-right">
          <a className="text-muted" href="./../edit/">
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
