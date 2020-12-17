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
  const { allCountryIds, byCountryId } = useSelector(selectEntriesForMap)
  return (
    <Container className="mt-2 mb-2">
      <div className="entry-map">
        <ReactMapGL
          {...viewState}
          width="100%"
          height="400px"
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewStateChange={handleViewStateChange}
        >
          {allCountryIds.map((countryId) => (
            <EntriesPopup key={countryId} countryId={countryId} entryIds={byCountryId[countryId]} />
          ))}
        </ReactMapGL>
        <div className="text-right small text-muted">
          Coordinates of cities are taken from{' '}
          <a href="https://simplemaps.com/data/world-cities">World Cities Database</a> (
          <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>)
        </div>
      </div>
      <style jsx>{`
        .entry-map :global(.mapboxgl-popup-content) {
          padding: 5px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </Container>
  )
}
