import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RegionId, Topic } from '@src/types'
import { selectFocusedToSearch } from '@src/redux/ui'
import { RootState } from '@src/redux'
import { loadMoreTweets } from '@src/redux/asyncActions'
import { useTranslation } from '@src/context/LanguageContext'
import { TwitterEntryContainer } from '@src/containers/TwitterEntryContainer'
import { TwitterCard } from '@src/presenters/TwitterCard'
import {
  selectTwitterEntriesForRegionTopicSearch,
  selectLoadingNoMoreTweetsForRegionTopicSearch
} from '@src/redux/globalSelectors'

interface Props {
  region: RegionId
  topic: Topic
}

export const TwitterCardContainer: React.FC<Props> = memo(({ region, topic }) => {
  const { lang } = useTranslation()
  const dispatch = useDispatch()
  const { byId, allIds } = useSelector((s: RootState) => selectTwitterEntriesForRegionTopicSearch(s, { region, topic }))
  const focusedToSearch = useSelector(selectFocusedToSearch)
  const { loading, noMore } = useSelector((s: RootState) =>
    selectLoadingNoMoreTweetsForRegionTopicSearch(s, { region, topic })
  )

  const handleLoadMoreTweets = useCallback(() => {
    if (focusedToSearch) return
    dispatch(loadMoreTweets({ region, topic, lang }))
  }, [region, topic, dispatch, lang, focusedToSearch])

  const renderTwitterEntry = useCallback(
    (id: string) => {
      return <TwitterEntryContainer key={id} entry={byId[id]} />
    },
    [region, topic, byId]
  )

  return (
    <TwitterCard
      entryIds={allIds}
      loading={loading}
      noMore={noMore}
      onLoadMore={handleLoadMoreTweets}
      renderEntry={renderTwitterEntry}
    />
  )
})
TwitterCardContainer.displayName = 'TwitterCardContainer'
