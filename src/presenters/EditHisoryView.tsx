import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { EditHistory, SubmitState } from '@src/types'
import { Loading } from '@src/components/Loading'

interface Props extends EditHistory {
  state: SubmitState
}

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

export const EditHistoryView: React.FC<Props> = (props) => {
  const { state, checked, notes, timestamp } = props
  return (
    <div>
      <h5>Modification History</h5>
      {state === 'pending' && <Loading />}
      {state === 'rejected' && <div>Failed to load edit history</div>}
      {state === 'fulfilled' &&
        (checked ? (
          <ul>
            <li>Modified {dayjs(timestamp).fromNow()}</li>
            <li>Notes: {notes}</li>
          </ul>
        ) : (
          <div>No history.</div>
        ))}
    </div>
  )
}
