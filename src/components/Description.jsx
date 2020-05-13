import React from 'react';
import Container from 'react-bootstrap/Container';

import meta from '../meta'

const Description = () => (
  <div className="mt-3">
    <Container>
      <div className="text-dark">
        {meta.desc}
      </div>
    </Container>
  </div>
);

export default Description;
