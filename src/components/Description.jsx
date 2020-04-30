import React from 'react';
import Container from 'react-bootstrap/Container';

const Description = ({ desc }) => (
  <>
    <div className="mt-3">
      <Container>
        <div className="text-dark">
          {desc}
        </div>
      </Container>
    </div>
  </>
);

export default Description;
