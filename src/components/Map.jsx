import React from 'react'
import Container from 'react-bootstrap/Container'

const url =
  'https://gisanddata.maps.arcgis.com/apps/Embed/index.html?webmap=14aa9e5660cf42b5b4b546dec6ceec7c&extent=77.3846,11.535,163.5174,52.8632&zoom=true&previewImage=false&scale=true&disable_scroll=false&theme=light'

const Map = () => (
  <Container className="mt-3">
    <iframe src={url} className="rounded embeddedMap" />
    <p className="text-right small text-dark mb-0 mt-0">提供：Johns Hopkins University</p>
    <style jsx>{`
      .embeddedMap {
        height: 300px;
        width: 100%;
        border: none;
      }
    `}</style>
  </Container>
)

export default Map
