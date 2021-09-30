import { memo } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { RegionId, Topic } from '@src/types'
import { GoodNewsList } from '@src/presenters/GoodNewsList'

interface Props {
  region: RegionId
  topic: Topic
}

export const GoodNewsListContainer: React.FC<Props> = memo(({ region, topic }) => {
  const { r } = region
  const { t } = topic
  return (
    <div className="mt-3">
      <Container className="rounded border wrap">
        <Row className="mt-2 mb-2">
          <Col className="col-sm-1">
            <img src="/images/GoodNewsLogo.svg" width="100%" />
            <input type="hidden" name="region" value={r} />
            <input type="hidden" name="topic" value={t} />
          </Col>
          <Col className="col-sm-11"></Col>
        </Row>
        <GoodNewsList />
      </Container>
    </div>
  )
})
GoodNewsListContainer.displayName = 'GoodNewsListContainer'
