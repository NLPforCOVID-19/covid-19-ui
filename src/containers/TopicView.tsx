import { useSelector } from 'react-redux'

import { selectRegions, selectTopics } from '@src/redux/regionsTopics'
import { selectViewTopic } from '@src/redux/ui'
import { CardContainer } from '@src/containers/CardContainer'

export const TopicView = () => {
  const topics = useSelector(selectTopics)
  const regions = useSelector(selectRegions)
  const selectedTopic = useSelector(selectViewTopic)
  return (
    <div>
      <div>
        {topics.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div>{selectedTopic}</div>
      <div>
        {regions.allIds.map((regionId) => (
          <CardContainer key={regionId} region={regionId} topic={selectedTopic} />
        ))}
      </div>
    </div>
  )
}
