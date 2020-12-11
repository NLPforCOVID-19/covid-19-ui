import Container from 'react-bootstrap/Container'
import ReactMapGL from 'react-map-gl'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectEntriesForMap } from '@src/redux/globalSelectors'
import { EntriesPopup } from '@src/containers/EntriesPopup'

export const MapBox = () => {
  const [viewState, setViewState] = useState({
    latitude: 36,
    longitude: 140,
    zoom: 1
  })
  const handleViewStateChange = useCallback(({ viewState }) => {
    const { latitude, longitude, zoom } = viewState
    setViewState({ latitude, longitude, zoom })
  }, [])
  const { allIds, byId } = useSelector(selectEntriesForMap)
  return (
    <Container className="mt-2 mb-2">
      <ReactMapGL
        {...viewState}
        width="100%"
        height="400px"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onViewStateChange={handleViewStateChange}
      >
        {allIds.map((countryId) => (
          <EntriesPopup key={countryId} countryId={countryId} entryIds={byId[countryId]} />
        ))}
      </ReactMapGL>
    </Container>
  )
}
