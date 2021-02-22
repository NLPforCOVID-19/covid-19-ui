import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { selectActive } from '@src/redux/regionsTopics'
import { selectViewMode } from '@src/redux/ui'
import { Loading } from '@src/components/Loading'
import { TwitterCardContainer } from '@src/containers/TwitterCardContainer'

export const TwitterViewContainer = () => {
  const { region: activeRegion, topic: activeTopic } = useSelector(selectActive)
  const viewMode = useSelector(selectViewMode)

  if (viewMode === 'region' || viewMode === 'topic') {
    return (
      <Container className="mt-2 mb-2">
        <Row>
          <TwitterCardContainer region={activeRegion} topic={activeTopic} />
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
TwitterViewContainer.displayName = 'TwitterViewsContainer'
