import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'

import { selectActive, selectRegions, selectTopics, setActiveRegion, setActiveTopic } from '@src/redux/regionsTopics'
import { selectViewMode } from '@src/redux/ui'
import { CardContainer } from '@src/containers/CardContainer'
import { Tabs } from '@src/components/Tabs'
import { Loading } from '@src/components/Loading'
import { Stats } from '@src/components/Stats'

export const NewsViewContainer = () => {
  const topics = useSelector(selectTopics)
  const regions = useSelector(selectRegions)
  const { region: activeRegion, topic: activeTopic } = useSelector(selectActive)
  const viewMode = useSelector(selectViewMode)
  const dispatch = useDispatch()
  const handleChangeTopic = useCallback((i) => dispatch(setActiveTopic(topics[i])), [dispatch, topics])
  const handleChangeRegion = useCallback((i) => dispatch(setActiveRegion(regions.allIds[i])), [dispatch, regions])
  const regionNames = useMemo(() => regions.allIds.map((rId) => regions.byId[rId].name), [regions])
  if (viewMode === 'region') {
    return (
      <div>
        <Tabs choices={regionNames} active={regions.byId[activeRegion].name} onChange={handleChangeRegion} />
        <Stats stats={regions.byId[activeRegion].stats} />
        <div>
          {topics.map((t) => (
            <CardContainer key={t} region={activeRegion} topic={t} />
          ))}
        </div>
      </div>
    )
  }
  if (viewMode === 'topic') {
    return (
      <div>
        <Tabs choices={topics} active={activeTopic} onChange={handleChangeTopic} />
        <div>
          {regions.allIds.map((regionId) => (
            <CardContainer key={regionId} region={regionId} topic={activeTopic} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="text-center">
      <Loading />
    </div>
  )
}
