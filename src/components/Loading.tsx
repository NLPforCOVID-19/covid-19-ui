import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => (
  <Spinner animation="border" role="status" variant="secondary">
    <span className="sr-only">Loading...</span>
  </Spinner>
)

export default Loading
