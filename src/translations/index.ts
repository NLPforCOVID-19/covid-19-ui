import { Lang, localeList } from '@src/types'

import { ja } from './ja'
import { en } from './en'

export { localeList } from '@src/types'
export const translations: Record<Lang, Record<string, string>> = { en, ja }
export const defaultLang = localeList[0]
export const isSupportedLang = (lang: string): lang is Lang => (localeList as Readonly<string[]>).includes(lang)
