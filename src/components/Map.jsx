import React from 'react';
import Container from 'react-bootstrap/Container';

const Map = ({ map }) => (
  <Container className="mt-3">
    <h5 className="mb-2" >発生状況</h5>
    <iframe src={map.url} className="rounded embeddedMap"/>
    <p className="text-right small text-dark mb-0 mt-0">提供：{map.source}</p>
    <style jsx>{`
      .embeddedMap {
        height: 240px;
        width: 100%;
        border:none;
      }
    `}</style>
  </Container>
);

export default Map;
