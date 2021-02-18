import { memo, useCallback } from 'react'

import { RegionId, Topic } from '@src/types'
import { selectViewMode, selectFocusedToSearch } from '@src/redux/ui'
import { useDispatch, useSelector } from 'react-redux'
import { selectRegions } from '@src/redux/regionsTopics'
import { RootState } from '@src/redux'
import { loadMore, loadMoreTweets } from '@src/redux/asyncActions'
import { useTranslation } from '@src/context/LanguageContext'
import { TwitterEntryContainer } from '@src/containers/TwitterEntryContainer'
import { TwitterCard } from '@src/presenters/TwitterCard'
import { selectTwitterEntriesForRegionTopicSearch, selectLoadingNoMoreTweetsForRegionTopicSearch } from '@src/redux/globalSelectors'

interface Props {
    region: RegionId,
    topic: Topic
}

export const TwitterCardContainer: React.FC<Props> = memo(({ region, topic }) => {
  const { lang } = useTranslation()
  const dispatch = useDispatch()
  console.log("Before")
  const { byId, allIds } = useSelector((s: RootState) => selectTwitterEntriesForRegionTopicSearch(s, { region, topic }))
  //console.log("byId type="+(typeof byId))
  //console.dir(byId)
  console.log(`allIds=${allIds}`)
  const viewMode = useSelector(selectViewMode)
  const focusedToSearch = useSelector(selectFocusedToSearch)
  const regions = useSelector(selectRegions)
  const { loading, noMore } = useSelector((s: RootState) =>
      selectLoadingNoMoreTweetsForRegionTopicSearch(s, { region, topic })
  )

  const handleLoadMoreTweets = useCallback(() => {
    console.log('handleLoadMoreTweets')
    if (focusedToSearch) return
    dispatch(loadMoreTweets({ region, topic, lang }))
  }, [region, topic, dispatch, lang, focusedToSearch])

  const renderTwitterEntry = useCallback(
    (id: string) => {
        console.log(`renderTwitterEntry id=${id}`)
        return <TwitterEntryContainer key={id} entry={byId[id]} regionId={region} topic={topic} />
    },
    [region, topic, byId]
  )

  return (
    <TwitterCard 
        entryIds={allIds} 
        loading={loading}
        noMore={noMore}
        onLoadMore={handleLoadMoreTweets}
        renderEntry={renderTwitterEntry} />
  )
})
TwitterCardContainer.displayName = 'TwitterCardContainer'
