import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { localeList, defaultLang } from '../translations'

const IndexPage = () => {
  const router = useRouter()
  useEffect(() => {
    const acceptLangs = [navigator.language, ...navigator.languages].map((l) => l.split('-')[0])
    let langToNavigate = defaultLang
    for (const prefferedLang of acceptLangs) {
      if (localeList.includes(prefferedLang)) {
        langToNavigate = prefferedLang
        break
      }
    }
    router.replace('/[lang]/', `/${langToNavigate}/`)
  }, [])
  return <Layout></Layout>
}

export default IndexPage
