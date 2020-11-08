import React, { useEffect, useContext } from 'react'
import { fetchMeta, loadAllTopicsNews, StoreContext } from '@src/store'
import { useTranslation } from '@src/context/LanguageContext'
import Layout from '@src/components/Layout'
import NewsView from '@src/components/NewsView'

const Edit = () => {
  const { lang } = useTranslation()
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
      <NewsView showEditButton />
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
