import Col from 'react-bootstrap/Col'

import { Url } from '@src/types'

interface Props {
  title: string
  entryIds: Url[]
  loading: boolean
  onClickTitle?: () => never
  onLoadMore: () => void
  renderEntry: (url: Url) => React.ReactElement
}

export const NewsCard: React.FC<Props> = (props) => {
  const { title, entryIds, loading, onLoadMore, renderEntry } = props
  return (
    <Col>
      <div>{title}</div>
      <div>
        {entryIds.map(renderEntry)}
        {loading && <div>loading</div>}
        <button onClick={onLoadMore}>load more</button>
      </div>
    </Col>
  )
}
