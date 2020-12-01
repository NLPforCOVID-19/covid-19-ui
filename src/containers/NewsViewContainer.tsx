import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'

import { selectRegions, selectTopics } from '@src/redux/regionsTopics'
import { selectViewTopic, setTopic, setRegion, selectViewMode, selectViewRegion } from '@src/redux/ui'
import { CardContainer } from '@src/containers/CardContainer'
import { Tabs } from '@src/components/Tabs'
import { Loading } from '@src/components/Loading'

export const NewsViewContainer = () => {
  const topics = useSelector(selectTopics)
  const regions = useSelector(selectRegions)
  const selectedTopic = useSelector(selectViewTopic)
  const selectedRegion = useSelector(selectViewRegion)
  const viewMode = useSelector(selectViewMode)
  const dispatch = useDispatch()
  const handleChangeTopic = useCallback((i) => dispatch(setTopic(topics[i])), [dispatch, topics])
  const handleChangeRegion = useCallback((i) => dispatch(setRegion(regions.allIds[i])), [dispatch, regions])
  const regionNames = useMemo(() => regions.allIds.map((rId) => regions.byId[rId].name), [regions])
  if (viewMode === 'region') {
    return (
      <div>
        <Tabs choices={regionNames} active={regions.byId[selectedRegion].name} onChange={handleChangeRegion} />
        <div>
          {topics.map((t) => (
            <CardContainer key={t} region={selectedRegion} topic={t} />
          ))}
        </div>
      </div>
    )
  }
  if (viewMode === 'topic') {
    return (
      <div>
        <Tabs choices={topics} active={selectedTopic} onChange={handleChangeTopic} />
        <div>
          {regions.allIds.map((regionId) => (
            <CardContainer key={regionId} region={regionId} topic={selectedTopic} />
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
