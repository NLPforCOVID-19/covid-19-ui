import Col from 'react-bootstrap/Col'
import { useCallback } from 'react'

import { Url } from '@src/types'

interface Props {
  title: string
  entryIds: Url[]
  loading: boolean
  onClickTitle: () => void
  onLoadMore: () => void
  renderEntry: (url: Url) => React.ReactElement
  renderSubInfo?: () => React.ReactElement
}

export const NewsCard: React.FC<Props> = (props) => {
  const { title, entryIds, loading, onClickTitle, onLoadMore, renderEntry, renderSubInfo } = props
  const handleClickTitle = useCallback(
    (e) => {
      e.preventDefault()
      onClickTitle()
    },
    [onClickTitle]
  )
  return (
    <Col>
      <div>
        <a href="#" onClick={handleClickTitle}>
          {title}
        </a>
      </div>
      {renderSubInfo && <div>{renderSubInfo()}</div>}
      <div>
        {entryIds.map(renderEntry)}
        {loading && <div>loading</div>}
        <button onClick={onLoadMore}>load more</button>
      </div>
    </Col>
  )
}
