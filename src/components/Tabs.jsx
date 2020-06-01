import React from 'react';
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';

const Tabs = ({ active, choices, onChange }) => (
  <div>
    {choices.map((topic, i) => (
      <span key={i}>
      {' '}
        <Button variant="outline-info" size="sm" active={active === topic} onClick={() => onChange(i)}>
        {topic}
      </Button>
    </span>
    ))}
  </div>
);

Tabs.propTypes = {
  active: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
}

export default Tabs
