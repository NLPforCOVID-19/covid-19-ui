import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

import { NewsCard } from '@src/presenters/NewsCard'
import { RegionId, Topic } from '@src/types'
import { selectEntryIdsForRegionTopic } from '@src/redux/entriesByRegionTopic'
import { selectViewMode } from '@src/redux/ui'
import { selectRegions } from '@src/redux/regionsTopics'
import { RootState } from '@src/redux'
import { loadMore } from '@src/redux/asyncActions'
import { useTranslation } from '@src/context/LanguageContext'
import { EntryContainer } from '@src/containers/EntryContainer'

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

  const renderEntry = useCallback((url) => <EntryContainer key={url} url={url} regionId={region} topic={topic} />, [
    region,
    topic
  ])

  const title = viewMode === 'region' ? topic : regions.byId[region].name

  return (
    <NewsCard
      title={title}
      entryIds={entryIdsForRegionTopic}
      loading={loading}
      onLoadMore={handleLoadMore}
      renderEntry={renderEntry}
    />
  )
}
