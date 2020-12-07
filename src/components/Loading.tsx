import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export const Loading = () => (
  <Spinner animation="border" role="status" variant="secondary">
    <span className="sr-only">Loading...</span>
  </Spinner>
)
