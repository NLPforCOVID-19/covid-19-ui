import { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { translations, defaultLang, localeList } from '../translations'

const LanguageContext = createContext({
  lang: defaultLang
})

export const LanguageProvider = ({ lang, children }) => {
  if (!localeList.includes(lang)) {
    lang = defaultLang
  }
  return <LanguageContext.Provider value={{ lang }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const { lang } = useContext(LanguageContext)
  function t(key) {
    if (typeof translations[lang][key] === 'undefined') {
      console.warn(`Translation not found. lang: ${lang}, key: ${key}`)
    }
    return translations[lang][key]
  }
  return { t, lang }
}

export function useLanguageRedirect(path) {
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
    router.replace(`/[lang]${path}`, `/${langToNavigate}${path}`)
  }, [path, router])
}
