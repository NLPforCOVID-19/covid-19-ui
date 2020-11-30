import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import dayjs from 'dayjs'

import { Lang, RegionId, Topic, Url } from '@src/types'
import { EntryView } from '@src/presenters/EntryView'
import { selectEntryByUrl } from '@src/redux/entries'
import { useTranslation } from '@src/context/LanguageContext'

const makeTranslatedUrl = (url, lang) => {
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
  url: Url
  topic: Topic
  regionId: RegionId
}

export const EntryContainer: React.FC<Props> = ({ url, topic, regionId }) => {
  const { lang, t } = useTranslation()
  const entry = useSelector((s) => selectEntryByUrl(s, url))
  // const entry: Entry = useMemo(() => entryFactory[url], [entryFactory, url])
  const date = useMemo(() => dayjs(entry.timestamp).format('MM/DD'), [entry.timestamp])
  const { main, alt } = useMemo(() => mainAltUrl(entry.country, lang, entry.url), [entry.country, lang, entry.url])
  const countryDisplayName = useMemo(() => t(entry.country), [entry.country, t])
  return (
    <EntryView
      title={entry.title}
      mainUrl={main}
      altUrl={alt}
      date={date}
      sourceName={entry.domainLabel}
      sourceUrl={''}
      snippet={entry.snippets[topic]}
      country={entry.country !== regionId ? countryDisplayName : undefined}
    />
  )
}
