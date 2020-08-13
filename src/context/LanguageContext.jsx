import React from 'react'
import { translations } from '../locales'

const defaultLang = 'en'

const LanguageContext = React.createContext({
  locale: defaultLang
})

export const LanguageProvider = ({ locale, children }) => {
  return <LanguageContext.Provider value={{ locale }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const { locale } = React.useContext(LanguageContext)
  function t(key) {
    return translations[locale][key]
  }
  return { t, locale }
}
