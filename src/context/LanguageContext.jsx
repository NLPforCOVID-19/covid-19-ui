import React from 'react'
import { translations } from '../translations'

const defaultLang = 'en'

const LanguageContext = React.createContext({
  lang: defaultLang
})

export const LanguageProvider = ({ lang, children }) => {
  return <LanguageContext.Provider value={{ lang }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const { lang } = React.useContext(LanguageContext)
  function t(key) {
    return translations[lang][key]
  }
  return { t, lang }
}
