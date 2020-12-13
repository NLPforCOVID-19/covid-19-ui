import { createContext, useCallback, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { translations, defaultLang, localeList, isSupportedLang } from '../translations'

import { Lang } from '@src/types'

const LanguageContext = createContext<{ lang: Lang }>({
  lang: defaultLang
})

export const LanguageProvider: React.FC<{ lang: Lang }> = ({ lang, children }) => {
  if (!localeList.includes(lang)) {
    lang = defaultLang
  }
  return <LanguageContext.Provider value={{ lang }}>{children}</LanguageContext.Provider>
}

// TODO: useCallback
export function useTranslation() {
  const { lang } = useContext(LanguageContext)
  const t = useCallback(
    (key: string) => {
      if (typeof translations[lang][key] === 'undefined') {
        if (typeof translations[defaultLang][key] === 'undefined') {
          throw new Error(`Unknown translation key: ${key}`)
        }
      }
      return translations[lang][key]
    },
    [lang]
  )
  return { t, lang }
}

export function useLanguageRedirect(path: string) {
  const router = useRouter()
  useEffect(() => {
    const acceptLangs = [navigator.language, ...navigator.languages].map((l) => l.split('-')[0])
    let langToNavigate: Lang = defaultLang
    for (const prefferedLang of acceptLangs) {
      if (isSupportedLang(prefferedLang)) {
        langToNavigate = prefferedLang
        break
      }
    }
    router.replace(`/[lang]${path}`, `/${langToNavigate}${path}`)
  }, [path, router])
}
