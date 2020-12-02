// import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import dayjs from 'dayjs'

import { Entry, Lang, RegionId, Topic, Url } from '@src/types'
import { EntryView } from '@src/presenters/EntryView'
// import { selectEntryByUrl } from '@src/redux/entries'
import { useTranslation } from '@src/context/LanguageContext'
// import { RootState } from '@src/redux'

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
  // const entry = useSelector((s: RootState) => selectEntryByUrl(s, url))
  const date = useMemo(() => dayjs(entry.timestamp).format('MM/DD'), [entry.timestamp])
  const { main, alt } = useMemo(() => mainAltUrl(entry.country, lang, entry.url), [entry.country, lang, entry.url])
  const countryDisplayName = useMemo(() => {
    if (regionId === entry.country) return
    return t(entry.country)
  }, [entry.country, t, regionId])
  const snippet = useMemo(() => (showSearchSnippet ? 'search' : entry.snippets[topic]), [
    entry.snippets,
    showSearchSnippet,
    topic
  ])

  return (
    <EntryView
      title={entry.title}
      mainUrl={main}
      altUrl={alt}
      date={date}
      sourceName={entry.domainLabel}
      sourceUrl={''}
      snippet={snippet}
      country={countryDisplayName}
    />
  )
}
