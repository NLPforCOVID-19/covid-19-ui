import React from 'react';
import Container from 'react-bootstrap/Container';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';

const Map = ({ map }) => (
  <Container className="mt-3 p-2 border rounded">
    <h5 className="mb-2" >発生状況</h5>
    <iframe src={map.url} className="rounded embeddedMap"/>
    <p className="text-right text-dark mb-0"><small>提供：{map.source}</small></p>
    <style jsx>{`
      .embeddedMap {
        height: 240px;
        width: 100%;
      }
    `}</style>
  </Container>
);

export default Map;
