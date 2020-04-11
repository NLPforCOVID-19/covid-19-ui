import React from 'react';
import Container from 'react-bootstrap/Container';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';

const Map = ({ map }) => (
  <Container className="mt-3 p-2 border rounded">
    <h5 className="mb-2" >発生状況</h5>
    <ResponsiveEmbed aspectRatio='21by9' className="rounded">
      <embed type="text/html" src={map.url} />
    </ResponsiveEmbed>
    <p className="text-right text-dark mb-0"><small>提供：{map.source}</small></p>
  </Container>
);

export default Map;
