import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';

const Map = ({ map }) => (
  <Container className="mt-3 p-3 border rounded">
    <Row>
      <Col md={12} lg={8}>
        <h4 className="mb-3">発生状況</h4>
        <ResponsiveEmbed aspectRatio='21by9' >
          <embed type="text/html" src={map.url} />
        </ResponsiveEmbed>
        <p className="text-right text-dark mt-2">提供：{map.source} </p>
      </Col>
      <Col>何か入る</Col>
    </Row>
  </Container>
);

export default Map;
