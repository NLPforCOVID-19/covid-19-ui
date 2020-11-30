import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux'

import { Layout } from '@src/components/Layout'
import { Description } from '@src/components/Description'
import { useTranslation } from '@src/context/LanguageContext'
import { FeedbackToast } from '@src/components/FeedbackToast'
import { languagePaths } from '@src/utils'
import { NewsViewContainer } from '@src/containers/NewsViewContainer'
import { selectRegionTopicLoaded } from '@src/redux/regionsTopics'
import { fetchMetaAndFirstEntries } from '@src/redux/asyncActions'

const Index = () => {
  const { t, lang } = useTranslation()
  const dispatch = useDispatch()
  const initialLoaded = useSelector(selectRegionTopicLoaded)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!initialLoaded) {
      dispatch(fetchMetaAndFirstEntries({ lang }))
    }
  }, [initialLoaded, dispatch, lang])

  useEffect(() => {
    const threshold = 0.2
    if (initialLoaded && Math.random() < threshold) {
      setTimeout(() => {
        setShowToast(true)
      }, 10000)
    }
  }, [initialLoaded])

  return (
    <Layout>
      <FeedbackToast show={showToast} onClose={() => setShowToast(false)} />
      <Description />
      <NewsViewContainer />
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