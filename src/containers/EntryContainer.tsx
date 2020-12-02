import { useCallback, useMemo } from 'react'
import dayjs from 'dayjs'

import { Entry, Lang, RegionId, Topic, Url } from '@src/types'
import { EntryView } from '@src/presenters/EntryView'
import { useTranslation } from '@src/context/LanguageContext'
import * as Icon from '@src/components/Icons'

const makeTranslatedUrl = (url: string, lang: string) => {
  return `https://translate.google.com/translate?tl=${lang}&u=${escape(url)}`
}

const localeLangMap: Record<string, Lang> = {
  us: 'en',
  jp: 'ja'
}

const mainAltUrl = (country: string, lang: Lang, url: Url) => {
  if (localeLangMap[country] === lang) {
    return { main: url }
  }
  return {
    main: makeTranslatedUrl(url, lang),
    alt: url
  }
}

interface Props {
  entry: Entry
  // url: Url
  topic: Topic
  regionId: RegionId
  showSearchSnippet: boolean
}

export const EntryContainer: React.FC<Props> = ({ entry, topic, regionId, showSearchSnippet }) => {
  const { lang, t } = useTranslation()
  const date = useMemo(() => dayjs(entry.timestamp).format('MM/DD'), [entry.timestamp])
  const { main, alt } = useMemo(() => mainAltUrl(entry.country, lang, entry.url), [entry.country, lang, entry.url])
  const countryDisplayName = useMemo(() => {
    if (regionId === entry.country) return
    return t(entry.country)
  }, [entry.country, t, regionId])
  const snippet = useMemo(() => (showSearchSnippet ? entry.snippets['Search'] : entry.snippets[topic]), [
    entry.snippets,
    showSearchSnippet,
    topic
  ])
  const aboutRumor = useMemo(() => (entry.flags.aboutRumor ? t('false_rumor') : undefined), [entry.flags.aboutRumor, t])
  const renderIcon = useCallback(() => (entry.flags.useful ? <Icon.Useful /> : <Icon.Default />), [entry.flags.useful])

  return (
    <EntryView
      title={entry.title}
      mainUrl={main}
      altUrl={alt}
      date={date}
      sourceName={entry.domainLabel}
      sourceUrl={entry.domainUrl}
      snippet={snippet}
      country={countryDisplayName}
      renderIcon={renderIcon}
      mark={aboutRumor}
    />
  )
}
