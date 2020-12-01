import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'

import { NewsCard } from '@src/presenters/NewsCard'
import { RegionId, Topic } from '@src/types'
import { selectEntryIdsForRegionTopic } from '@src/redux/entriesByRegionTopic'
import { selectViewMode, changeViewMode } from '@src/redux/ui'
import { selectRegions, setActiveTopic, setActiveRegion } from '@src/redux/regionsTopics'
import { RootState } from '@src/redux'
import { loadMore } from '@src/redux/asyncActions'
import { useTranslation } from '@src/context/LanguageContext'
import { EntryContainer } from '@src/containers/EntryContainer'
import { Stats } from '@src/components/Stats'

interface Props {
  region: RegionId
  topic: Topic
}

export const CardContainer: React.FC<Props> = ({ region, topic }) => {
  const { lang } = useTranslation()
  const dispatch = useDispatch()
  const entryIdsForRegionTopic = useSelector((state) => selectEntryIdsForRegionTopic(state, { region, topic }))
  const viewMode = useSelector(selectViewMode)
  const regions = useSelector(selectRegions)
  const loading = useSelector((state: RootState) => state.entriesByRegionTopic[region][topic].loading)

  const handleLoadMore = useCallback(() => {
    dispatch(loadMore({ region, topic, lang }))
  }, [region, topic, dispatch, lang])

  const handleClickTitle = useCallback(() => {
    if (viewMode === 'topic') {
      dispatch(setActiveRegion(region))
      dispatch(changeViewMode('region'))
    } else if (viewMode === 'region') {
      dispatch(setActiveTopic(topic))
      dispatch(changeViewMode('topic'))
    }
  }, [dispatch, region, topic, viewMode])

  const renderEntry = useCallback((url) => <EntryContainer key={url} url={url} regionId={region} topic={topic} />, [
    region,
    topic
  ])

  const renderStats = useCallback(() => <Stats stats={regions.byId[region].stats} />, [regions.byId, region])

  const title = useMemo(() => (viewMode === 'region' ? topic : regions.byId[region].name), [
    viewMode,
    topic,
    region,
    regions.byId
  ])

  return (
    <NewsCard
      title={title}
      entryIds={entryIdsForRegionTopic}
      loading={loading}
      onClickTitle={handleClickTitle}
      onLoadMore={handleLoadMore}
      renderEntry={renderEntry}
      renderSubInfo={viewMode === 'topic' && renderStats}
    />
  )
}
