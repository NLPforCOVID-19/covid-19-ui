import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { selectActive, selectRegions, selectTopics, setActiveRegion, setActiveTopic } from '@src/redux/regionsTopics'
import { selectViewMode, focusToSearch } from '@src/redux/ui'
import { CardContainer } from '@src/containers/CardContainer'
import { Tabs } from '@src/components/Tabs'
import { Loading } from '@src/components/Loading'
import { Stats } from '@src/components/Stats'
import { TopicSearchForm } from '@src/components/TopicSearchForm'
import { searchForAllRegion } from '@src/redux/asyncActions'
import { useTranslation } from '@src/context/LanguageContext'
import { selectCurrentQuery } from '@src/redux/search'
import IndicatorLegends from '@src/components/IndicatorLegends'

export const NewsViewContainer = () => {
  const { lang } = useTranslation()
  const topics = useSelector(selectTopics)
  const regions = useSelector(selectRegions)
  const { region: activeRegion, topic: activeTopic } = useSelector(selectActive)
  const viewMode = useSelector(selectViewMode)
  const currentQuery = useSelector(selectCurrentQuery)

  const dispatch = useDispatch()
  const handleChangeTopic = useCallback(
    (i) => {
      dispatch(focusToSearch(false))
      dispatch(setActiveTopic(topics[i]))
    },
    [dispatch, topics]
  )
  const handleChangeRegion = useCallback(
    (i) => {
      dispatch(focusToSearch(false))
      dispatch(setActiveRegion(regions.allIds[i]))
    },
    [dispatch, regions]
  )
  const handleFocusToSearchForm = useCallback(() => dispatch(focusToSearch(true)), [dispatch])
  const handleSearch = useCallback(
    (query: string) => {
      dispatch(focusToSearch(true))
      if (query === currentQuery) return
      dispatch(searchForAllRegion({ lang, query }))
    },
    [dispatch, lang, currentQuery]
  )

  const regionNames = useMemo(() => regions.allIds.map((rId) => regions.byId[rId].name), [regions])
  if (viewMode === 'region') {
    return (
      <Container>
        <Row>
          <IndicatorLegends />
        </Row>
        <Row>
          <Tabs choices={regionNames} active={regions.byId[activeRegion].name} onChange={handleChangeRegion} />
        </Row>
        <Row>
          <div className="text-muted">
            <Stats stats={regions.byId[activeRegion].stats} />
          </div>
        </Row>
        <Row>
          {topics.map((t) => (
            <CardContainer key={t} region={activeRegion} topic={t} />
          ))}
        </Row>
      </Container>
    )
  }
  if (viewMode === 'topic') {
    return (
      <Container>
        <Row>
          <IndicatorLegends />
        </Row>
        <Row>
          <Tabs choices={topics} active={activeTopic} onChange={handleChangeTopic} />
          <TopicSearchForm onFocus={handleFocusToSearchForm} onSubmit={handleSearch} />
        </Row>
        <Row>
          {regions.allIds.map((regionId) => (
            <CardContainer key={regionId} region={regionId} topic={activeTopic} />
          ))}
        </Row>
      </Container>
    )
  }
  return (
    <Container className="text-center">
      <Loading />
    </Container>
  )
}
