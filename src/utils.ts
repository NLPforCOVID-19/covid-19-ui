import { Lang, Url } from '@src/types'

import { localeList } from './translations'

export function makeTranslatedUrl(url: string, lang: string) {
  return `https://translate.google.com/translate?tl=${lang}&u=${escape(url)}`
}

export const languagePaths = localeList.map((lang) => ({ params: { lang } }))
const localeLangMap: Record<string, Lang> = {
  us: 'en',
  jp: 'ja'
}
export const mainAltUrl = (country: string, lang: Lang, url: Url) => {
  if (localeLangMap[country] === lang) {
    return { main: url }
  }
  return {
    main: makeTranslatedUrl(url, lang),
    alt: url
  }
}
