export function makeTranslatedUrl(url) {
  const target_lang = 'ja'
  return `https://translate.google.com/translate?tl=${target_lang}&u=${url}`
}
