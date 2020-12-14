import React, { memo } from 'react'
import Spinner from 'react-bootstrap/Spinner'

export const Loading = memo(() => (
  <Spinner animation="border" role="status" variant="secondary">
    <span className="sr-only">Loading...</span>
  </Spinner>
))
Loading.displayName = 'Loading'
