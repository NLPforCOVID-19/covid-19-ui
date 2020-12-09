import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'

import { NewsCard } from '@src/presenters/NewsCard'
import { RegionId, Topic } from '@src/types'
import { selectViewMode, changeViewMode, selectFocusedToSearch, focusToSearch } from '@src/redux/ui'
import { selectRegions, setActiveTopic, setActiveRegion } from '@src/redux/regionsTopics'
import { RootState } from '@src/redux'
import { loadMore } from '@src/redux/asyncActions'
import { useTranslation } from '@src/context/LanguageContext'
import { EntryContainer } from '@src/containers/EntryContainer'
import { Stats } from '@src/components/Stats'
import { selectEntriesForRegionTopicSearch, selectLoadingNoMoreForRegionTopicSearch } from '@src/redux/globalSelectors'

interface Props {
  region: RegionId
  topic: Topic
}

export const CardContainer: React.FC<Props> = ({ region, topic }) => {
  const { lang } = useTranslation()
  const dispatch = useDispatch()
  const { byId, allIds } = useSelector((s: RootState) => selectEntriesForRegionTopicSearch(s, { region, topic }))
  const viewMode = useSelector(selectViewMode)
  const focusedToSearch = useSelector(selectFocusedToSearch)
  const regions = useSelector(selectRegions)
  const { loading, noMore } = useSelector((s: RootState) =>
    selectLoadingNoMoreForRegionTopicSearch(s, { region, topic })
  )

  const handleLoadMore = useCallback(() => {
    if (focusedToSearch) return
    dispatch(loadMore({ region, topic, lang }))
  }, [region, topic, dispatch, lang, focusedToSearch])

  const handleClickTitle = useCallback(() => {
    dispatch(focusToSearch(false))
    if (viewMode === 'topic') {
      dispatch(setActiveRegion(region))
      dispatch(changeViewMode('region'))
    } else if (viewMode === 'region') {
      dispatch(setActiveTopic(topic))
      dispatch(changeViewMode('topic'))
    }
  }, [dispatch, region, topic, viewMode])

  const renderEntry = useCallback(
    (url: string) => {
      return (
        <EntryContainer
          key={url}
          entry={byId[url]}
          regionId={region}
          topic={topic}
          showSearchSnippet={focusedToSearch}
        />
      )
    },
    [region, topic, focusedToSearch, byId]
  )

  const renderStats = useCallback(() => {
    return <Stats stats={regions.byId[region].stats} />
  }, [regions.byId, region])

  const title = useMemo(() => (viewMode === 'region' ? topic : regions.byId[region].name), [
    viewMode,
    topic,
    region,
    regions.byId
  ])

  return (
    <NewsCard
      title={title}
      entryIds={allIds}
      loading={loading}
      onClickTitle={handleClickTitle}
      noMore={noMore}
      onLoadMore={handleLoadMore}
      renderEntry={renderEntry}
      renderSubInfo={viewMode === 'topic' ? renderStats : undefined}
    />
  )
}
