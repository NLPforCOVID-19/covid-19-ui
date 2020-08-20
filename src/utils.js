import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { localeList, defaultLang } from './translations'

export function makeTranslatedUrl(url) {
  const target_lang = 'ja'
  return `https://translate.google.com/translate?tl=${target_lang}&u=${url}`
}

export const languagePaths = localeList.map((lang) => ({ params: { lang } }))

export function useLangageRedirect(path) {
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
  }, [])
}
