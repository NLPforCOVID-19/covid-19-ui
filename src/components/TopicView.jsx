import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import IndicatorLegends from './IndicatorLegends'
import Tabs from './Tabs'
import Row from 'react-bootstrap/Row'
import NewsCard from './NewsCard'
import Stats from './Stats'
import { StoreContext } from '../store'
import { TopicSearchForm } from './TopicSearchForm'
import { SearchView } from './SearchView'

export const TopicView = ({ selectedTopic, showEditButton, onClickTopic, onClickRegion }) => {
  const [state] = useContext(StoreContext)
  const { topics, countries } = state.meta
  const [focusedToSearch, setFocusedToSearch] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const handleSubmitSearch = React.useCallback((newQuery) => {
    setQuery(newQuery)
  }, [])
  const handleClickTopic = React.useCallback(
    (idx) => {
      setFocusedToSearch(false)
      onClickTopic(topics[idx])
    },
    [onClickTopic]
  )
  return (
    <Container className="mt-3">
      <IndicatorLegends />
      <Row>
        <Tabs active={focusedToSearch ? '' : selectedTopic} choices={topics} onChange={handleClickTopic} />
        <TopicSearchForm onFocus={() => setFocusedToSearch(true)} onSubmit={handleSubmitSearch} />
      </Row>
      <SearchView query={query} show={focusedToSearch} onClickRegion={onClickRegion} />
      {!focusedToSearch && (
        <Row className="mt-2">
          {countries.map((c) => (
            <NewsCard
              key={c.country}
              title={c.name}
              countryId={c.country}
              topic={selectedTopic}
              onClickTitle={() => onClickRegion(c.country)}
              showEditButton={showEditButton}
            >
              <div className="text-muted small">
                <Stats stats={c.stats} />
              </div>
            </NewsCard>
          ))}
        </Row>
      )}
    </Container>
  )
}
