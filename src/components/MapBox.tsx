import Container from 'react-bootstrap/Container'
import ReactMapGL from 'react-map-gl'
import { useState } from 'react'

export const MapBox = () => {
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 0
  })
  return (
    <Container className="mt-2 mb-2">
      <ReactMapGL
        {...viewState}
        width="100%"
        height="400px"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onViewStateChange={(newState) => {
          setViewState(newState)
        }}
      />
    </Container>
  )
}
