import { memo } from 'react'

import { RegionId, Topic } from '@src/types'
import { useDispatch, useSelector } from 'react-redux'
import { selectRegions } from '@src/redux/regionsTopics'
import { useTranslation } from '@src/context/LanguageContext'
import { TwitterCard } from '@src/presenters/TwitterCard'
import { selectEntriesForRegionTopicSearch } from '@src/redux/globalSelectors'

interface Props {
    region: RegionId,
    topic: Topic
}

export const TwitterCardContainer: React.FC<Props> = memo(({ region, topic }) => {
  const { lang } = useTranslation()
  const dispatch = useDispatch()
  const { byId, allIds } = useSelector((s: RootState) => selectEntriesForRegionTopicSearch(s, { region, topic }))
  //const viewMode = useSelector(selectViewMode)
  //const focusedToSearch = useSelector(selectFocusedToSearch)
  const regions = useSelector(selectRegions)
  //const { loading, noMore } = useSelector((s: RootState) =>
  //  selectLoadingNoMoreForRegionTopicSearch(s, { region, topic })
  //)

  //const handleLoadMore = useCallback(() => {
  //  if (focusedToSearch) return
  //  dispatch(loadMore({ region, topic, lang }))
  //}, [region, topic, dispatch, lang, focusedToSearch])

  //const renderEntry = useCallback(
  //  (url: string) => {
  //    return <EntryContainer key={url} entry={byId[url]} regionId={region} topic={topic} />
  //  },
  //  [region, topic, byId]
  //)

  //const renderStats = useCallback(() => {
  //  return <Stats stats={regions.byId[region].stats} />
  //}, [regions.byId, region])

  //const title = useMemo(() => (viewMode === 'region' ? topic : regions.byId[region].name), [
  //  viewMode,
  //  topic,
  //  region,
  //  regions.byId
  //])

  return (
    <TwitterCard region={region}/>
  )
})
TwitterCardContainer.displayName = 'TwitterCardContainer'
