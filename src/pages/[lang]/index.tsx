import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Layout } from '@src/components/Layout'
import { Description } from '@src/components/Description'
import { useTranslation } from '@src/context/LanguageContext'
import { FeedbackToast } from '@src/components/FeedbackToast'
import { languagePaths } from '@src/utils'
import { selectRegionTopicLoaded } from '@src/redux/regionsTopics'
import { fetchMetaAndFirstEntries } from '@src/redux/asyncActions'
import { NewsViewContainer } from '@src/containers/NewsViewContainer'
import { createNewsViewHash } from '@src/redux/globalSelectors'
import { changeEditMode } from '@src/redux/ui'
import { Lang } from '@src/types'
import { defaultLang } from '@src/translations'
import { MapBox } from '@src/containers/MapBox'

interface Props {
  lang: Lang
}

const Index: NextPage<Props> = () => {
  const { t, lang } = useTranslation()
  const dispatch = useDispatch()
  const initialLoaded = useSelector(selectRegionTopicLoaded)
  const hash = useSelector(createNewsViewHash)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!initialLoaded) {
      dispatch(fetchMetaAndFirstEntries({ lang, hash: location.hash }))
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

  useEffect(() => {
    if (initialLoaded) {
      location.hash = hash
    }
  }, [hash, initialLoaded])
  useEffect(() => {
    dispatch(changeEditMode(false))
  })

  return (
    <Layout>
      <FeedbackToast show={showToast} onClose={() => setShowToast(false)} />
      <Description />
      <MapBox />
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

type Query = {
  lang: Lang
}

export const getStaticProps: GetStaticProps<Props, Query> = async (ctx) => {
  const lang = ctx.params?.lang || defaultLang
  return {
    props: {
      lang
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: languagePaths,
    fallback: false
  }
}

export default Index
