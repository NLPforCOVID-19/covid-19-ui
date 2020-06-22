import React from 'react'
import Form from 'react-bootstrap/Form'

export const ModifyForm = ({ entry, regions, topics }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>修正後の地域</Form.Label>
        <Form.Control as="select">
          {regions.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>修正後のカテゴリ</Form.Label>
        <Form.Control as="select">
          {topics.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  )
}
