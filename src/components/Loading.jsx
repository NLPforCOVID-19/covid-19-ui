import Spinner from "react-bootstrap/Spinner";

export default () => (
  <Spinner animation="border" role="status" variant="secondary">
    <span className="sr-only">Loading...</span>
  </Spinner>
);
