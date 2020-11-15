import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Tabs = ({ active, choices, onChange }) => (
  <>
    {choices.map((topic, i) => (
      <span key={i} className="mb-2">
        <Button variant="outline-info" size="sm" active={active === topic} onClick={() => onChange(i)}>
          {topic}
        </Button>
        &thinsp;
      </span>
    ))}
  </>
)

Tabs.propTypes = {
  active: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
}

export default Tabs
