import React from 'react';
import Container from 'react-bootstrap/Container';

import meta from '../meta'
import Link from 'next/link';

const Description = () => (
  <div className="mt-3">
    <Container>
      <div className="text-dark">
        {meta.desc}
        <Link href="./about/"><a>このサイトの使い方</a></Link>
      </div>
    </Container>
  </div>
);

export default Description;
