import { memo, useMemo } from 'react'
import dayjs from 'dayjs'

import { TwitterEntry, TwitterEntryWithSearchSnippet } from '@src/types'
import { TwitterEntryView } from '@src/presenters/TwitterEntryView'
import { useTranslation } from '@src/context/LanguageContext'
// import { SnippetTagRenderer } from '@src/presenters/SnippetTagRenderer'

interface Props {
  entry: TwitterEntryWithSearchSnippet | TwitterEntry
}

export const TwitterEntryContainer: React.FC<Props> = memo(({ entry }) => {
  const { lang } = useTranslation()
  const shortTimestamp = useMemo(() => dayjs(entry.timestamp).format('MM/DD HH:mm'), [entry.timestamp])
  const contentTrans = entry.lang == lang ? '' : entry.contentTrans
  // const renderSnippet = useCallback(() => {
  //   if (entry.kind === 'Entry') {
  //     return <>{entry.snippets[topic]}</>
  //   }
  //   if (entry.kind === 'EntryWithSearchSnippet') {
  //     return (
  //       <>
  //         {entry.searchSnippet.map((tag, i) => (
  //           <SnippetTagRenderer key={i} tag={tag} />
  //         ))}
  //       </>
  //     )
  //   }
  //   return entry
  // }, [topic, entry])

  return (
    <TwitterEntryView
      id={entry.id}
      name={entry.name}
      username={entry.username}
      verified={entry.verified}
      avatar={entry.avatar}
      contentOrig={entry.contentOrig}
      contentTrans={contentTrans}
      timestamp={shortTimestamp}
      retweetCount={entry.retweetCount}
    />
  )
})
TwitterEntryContainer.displayName = 'TwitterEntryContainer'
