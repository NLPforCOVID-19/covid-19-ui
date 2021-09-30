import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'

import { selectActive } from '@src/redux/regionsTopics'
import { selectViewMode } from '@src/redux/ui'
import { Loading } from '@src/components/Loading'
import { GoodNewsListContainer } from '@src/containers/GoodNewsListContainer'

export const GoodNewsViewContainer = () => {
  const { region: activeRegion } = useSelector(selectActive)
  const viewMode = useSelector(selectViewMode)

  switch (viewMode) {
    case 'region':
      return <GoodNewsListContainer region={activeRegion} topic="all" />

    case 'topic':
      return <GoodNewsListContainer region="all" topic="all" />

    default:
      return (
        <Container className="text-center">
          <Loading />
        </Container>
      )
  }
}
GoodNewsViewContainer.displayName = 'GoodNewsViewContainer'
