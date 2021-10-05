import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectRegionTopicLoaded } from '../redux/regionsTopics'
import { fetchMetaAndFirstEntries } from '../redux/asyncActions'

import { useTranslation } from '@src/context/LanguageContext'
import { Layout } from '@src/components/Layout'
import { changeEditMode } from '@src/redux/ui'
import { GoodNewsListContainer } from '@src/containers/GoodNewsListContainer'
import { NewsViewContainer } from '@src/containers/NewsViewContainer'
import { EditModalContainer } from '@src/containers/EditModalContainer'

const Edit = () => {
  const { lang } = useTranslation()
  const dispatch = useDispatch()
  const initialLoaded = useSelector(selectRegionTopicLoaded)

  useEffect(() => {
    if (!initialLoaded) {
      dispatch(fetchMetaAndFirstEntries({ lang, hash: '' }))
    }
  }, [initialLoaded, dispatch, lang])

  useEffect(() => {
    dispatch(changeEditMode(true))
  }, [dispatch])

  return (
    <Layout>
      <EditModalContainer />
      <GoodNewsListContainer region="all" topic="all" />
      <NewsViewContainer />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      lang: 'ja'
    }
  }
}

export default Edit
