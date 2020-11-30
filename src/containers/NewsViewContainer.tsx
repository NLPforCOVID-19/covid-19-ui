import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'

import { selectRegionTopicLoaded } from '@src/redux/regionsTopics'
import { selectViewMode } from '@src/redux/ui'
import { TopicView } from '@src/containers/TopicView'
import { Loading } from '@src/components/Loading'

export const NewsViewContainer = () => {
  const metaLoaded = useSelector(selectRegionTopicLoaded)
  const viewMode = useSelector(selectViewMode)
  if (!metaLoaded) {
    return (
      <Container className="text-center m-3">
        <Loading />
      </Container>
    )
  }
  return (
    <div>
      {viewMode === 'topic' && <TopicView />}
      {viewMode === 'region' && <div>RegionView</div>}
    </div>
  )
}
