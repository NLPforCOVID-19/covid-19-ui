import { memo } from 'react'

import { TwitterCard } from '@src/presenters/TwitterCard'

export const TwitterCardContainer: React.FC<Props> = memo(({ country, topic }) => {
  //const { lang } = useTranslation()
  //const dispatch = useDispatch()
  //const { byId, allIds } = useSelector((s: RootState) => selectEntriesForRegionTopicSearch(s, { region, topic }))
  //const viewMode = useSelector(selectViewMode)
  //const focusedToSearch = useSelector(selectFocusedToSearch)
  //const regions = useSelector(selectRegions)
  //const { loading, noMore } = useSelector((s: RootState) =>
  //  selectLoadingNoMoreForRegionTopicSearch(s, { region, topic })
  //)

  //const handleLoadMore = useCallback(() => {
  //  if (focusedToSearch) return
  //  dispatch(loadMore({ region, topic, lang }))
  //}, [region, topic, dispatch, lang, focusedToSearch])

  //const handleClickTitle = useCallback(() => {
  //  dispatch(focusToSearch(false))
  //  if (viewMode === 'topic') {
  //    dispatch(setActiveRegion(region))
  //    dispatch(changeViewMode('region'))
  //  } else if (viewMode === 'region') {
  //    dispatch(setActiveTopic(topic))
  //    dispatch(changeViewMode('topic'))
  //  }
  //}, [dispatch, region, topic, viewMode])

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
    <TwitterCard />
  )
})
TwitterCardContainer.displayName = 'TwitterCardContainer'
