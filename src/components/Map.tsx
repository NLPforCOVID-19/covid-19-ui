import Container from 'react-bootstrap/Container'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import React, { useCallback, useMemo, useState } from 'react'

import { EntryForMap } from '@src/types'
import { selectEntriesForMap } from '@src/redux/globalSelectors'
import { InfoWindowContent } from '@src/presenters/InfoWindowContent'

const InfoWindowForEntry: React.FC<{ entry: EntryForMap }> = ({ entry }) => {
  const [markerObj, setMarkerObj] = useState(null)
  const [isOpen, setIsOpen] = useState(true)
  const handleMarkerLoaded = useCallback((marker) => {
    setMarkerObj(marker)
  }, [])
  const position = useMemo(() => {
    const { lat, lng } = entry.position
    return { lat: lat + Math.random() - 0.5, lng: lng + Math.random() - 0.5 }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.position.lat, entry.position.lng])
  return (
    <>
      <Marker position={position} onLoad={handleMarkerLoaded} onClick={() => setIsOpen(true)} />
      {isOpen && markerObj !== null && (
        <InfoWindow anchor={markerObj} onCloseClick={() => setIsOpen(false)}>
          <InfoWindowContent title={entry.title} />
        </InfoWindow>
      )}
    </>
  )
}

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })
  const entries = useSelector(selectEntriesForMap)
  if (loadError) {
    return <div>Error while loading google maps.</div>
  }
  return (
    <Container className="text-center">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px', marginTop: '50px' }}
          center={{ lat: 0, lng: 0 }}
          zoom={2}
        >
          {entries.map((e) => (
            <InfoWindowForEntry key={e.title} entry={e} />
          ))}
        </GoogleMap>
      )}
    </Container>
  )
}

export default Map
