import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const TopicSearchForm = React.memo(function TopicSearchForm({ onFocus, onSubmit }) {
  const [query, setQuery] = React.useState('')
  const handleChangeQuery = React.useCallback((e) => {
    setQuery(e.target.value)
  }, [])
  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault()
      onSubmit(query)
    },
    [query]
  )
  return (
    <Form inline onSubmit={handleSubmit} className="mb-2">
      <Form.Control
        onFocus={onFocus}
        type="search"
        placeholder="検索:"
        size="sm"
        value={query}
        onChange={handleChangeQuery}
      />
      &thinsp;
      <Button type="submit" size="sm">
        検索
      </Button>
    </Form>
  )
})
