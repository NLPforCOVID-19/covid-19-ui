import React from 'react'
import Button from 'react-bootstrap/Button'

interface Props {
  active?: string
  choices: string[]
  onChange: (i: number) => never
}

export const Tabs: React.FC<Props> = ({ active, choices, onChange }) => {
  return (
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
}
