import { useCallback, useMemo } from 'react'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'

import { Entry, EntryWithSearchSnippet, Lang, RegionId, Topic, Url } from '@src/types'
import { EntryView } from '@src/presenters/EntryView'
import { useTranslation } from '@src/context/LanguageContext'
import * as Icon from '@src/components/Icons'
import { selectEditMode, startEdit } from '@src/redux/ui'
import { makeTranslatedUrl } from '@src/utils'
import { SnippetTagRenderer } from '@src/presenters/SnippetTagRenderer'

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
  entry: EntryWithSearchSnippet | Entry
  topic: Topic
  regionId: RegionId
}

export const EntryContainer: React.FC<Props> = ({ entry, topic, regionId }) => {
  const { lang, t } = useTranslation()
  const dispatch = useDispatch()
  const editMode = useSelector(selectEditMode)

  const date = useMemo(() => dayjs(entry.timestamp).format('MM/DD'), [entry.timestamp])
  const { main, alt } = useMemo(() => mainAltUrl(entry.country, lang, entry.url), [entry.country, lang, entry.url])
  const countryDisplayName = useMemo(() => {
    if (regionId === entry.country) return
    return t(entry.country)
  }, [entry.country, t, regionId])

  const renderSnippet = useCallback(() => {
    if (entry.kind === 'Entry') {
      return <>{entry.snippets[topic]}</>
    }
    if (entry.kind === 'EntryWithSearchSnippet') {
      return (
        <>
          {entry.searchSnippet.map((tag, i) => (
            <SnippetTagRenderer key={i} tag={tag} />
          ))}
        </>
      )
    }
    return entry
  }, [topic, entry])

  const aboutRumor = useMemo(() => (entry.flags.aboutRumor ? t('false_rumor') : undefined), [entry.flags.aboutRumor, t])

  const handleClickEdit = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      if (!editMode) return
      dispatch(startEdit(entry))
    },
    [editMode, dispatch, entry]
  )

  const renderIcon = useCallback(() => {
    return (
      <>
        {entry.flags.useful ? <Icon.Useful /> : <Icon.Default />}
        {editMode && (
          <a href="#" onClick={handleClickEdit}>
            <Icon.Edit />
          </a>
        )}
      </>
    )
  }, [entry.flags.useful, editMode, handleClickEdit])

  return (
    <EntryView
      title={entry.title}
      mainUrl={main}
      altUrl={alt}
      date={date}
      sourceName={entry.domainLabel}
      sourceUrl={entry.domainUrl}
      renderSnippet={renderSnippet}
      country={countryDisplayName}
      renderIcon={renderIcon}
      mark={aboutRumor}
    />
  )
}
