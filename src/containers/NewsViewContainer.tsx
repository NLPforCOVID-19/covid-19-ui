import { useSelector } from 'react-redux'

import { selectRegionTopicLoaded } from '@src/redux/regionsTopics'
import { selectViewMode } from '@src/redux/ui'
import { TopicView } from '@src/containers/TopicView'

export const NewsViewContainer = () => {
  const metaLoaded = useSelector(selectRegionTopicLoaded)
  const viewMode = useSelector(selectViewMode)
  if (!metaLoaded) {
    return <div>loading...</div>
  }
  return (
    <div>
      {viewMode === 'topic' && <TopicView />}
      {viewMode === 'region' && <div>RegionView</div>}
    </div>
  )
}
