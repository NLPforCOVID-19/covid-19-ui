import { localeList } from './translations'

export function makeTranslatedUrl(url) {
  const target_lang = 'ja'
  return `https://translate.google.com/translate?tl=${target_lang}&u=${url}`
}

export const languagePaths = localeList.map((lang) => ({ params: { lang } }))
