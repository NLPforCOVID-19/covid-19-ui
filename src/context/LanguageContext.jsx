import React from 'react'

import { translations, defaultLang, localeList } from '../translations'

const LanguageContext = React.createContext({
  lang: defaultLang
})

export const LanguageProvider = ({ lang, children }) => {
  if (!localeList.includes(lang)) {
    lang = defaultLang
  }
  return <LanguageContext.Provider value={{ lang }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const { lang } = React.useContext(LanguageContext)
  function t(key) {
    if (typeof translations[lang][key] === 'undefined') {
      console.warn(`Translation not found. lang: ${lang}, key: ${key}`)
    }
    return translations[lang][key]
  }
  return { t, lang }
}
