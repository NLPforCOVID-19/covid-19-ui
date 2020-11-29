import Col from 'react-bootstrap/Col'

import { Entry } from '@src/types'
import { EntryView } from '@src/presenters/EntryView'

interface Props {
  title: string
  entries: Entry[]
  loading: boolean
  onClickTitle?: () => void
  onLoadMore: () => void
}

export const NewsCard: React.FC<Props> = (props) => {
  const { title, entries, loading, onLoadMore } = props
  return (
    <Col>
      <div>{title}</div>
      <div>
        {entries.map((e) => (
          <EntryView key={e.url} entry={e} />
        ))}
        {loading && <div>loading</div>}
        <button onClick={onLoadMore}>load more</button>
      </div>
    </Col>
  )
}
