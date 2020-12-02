import React from 'react'
import Button from 'react-bootstrap/Button'

interface Props {
  active?: string
  choices: string[]
  onChange: (choiceIndex: number) => void
}

export const Tabs: React.FC<Props> = ({ active, choices, onChange }) => {
  return (
    <div>
      {choices.map((choice, i) => (
        <span key={choice} className="mb-2">
          <Button variant="outline-info" size="sm" active={active === choice} onClick={() => onChange(i)}>
            {choice}
          </Button>
          &thinsp;
        </span>
      ))}
    </div>
  )
}
