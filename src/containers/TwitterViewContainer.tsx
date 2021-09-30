import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { selectActive } from '@src/redux/regionsTopics'
import { selectViewMode } from '@src/redux/ui'
import { Loading } from '@src/components/Loading'
import { TwitterCardContainer } from '@src/containers/TwitterCardContainer'

export const TwitterViewContainer = () => {
  const { region: activeRegion } = useSelector(selectActive)
  const viewMode = useSelector(selectViewMode)

  switch (viewMode) {
    case 'region':
      return (
        <TwitterCardContainer region={activeRegion} topic="all" />
      )

    case 'topic':
      return (
        <TwitterCardContainer region="all" topic="all" />
      )

    default:
      return (
        <Container className="text-center">
          <Loading />
        </Container>
      )
  }
}
TwitterViewContainer.displayName = 'TwitterViewsContainer'
