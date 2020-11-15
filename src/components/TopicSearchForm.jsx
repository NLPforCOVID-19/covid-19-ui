import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useTranslation } from '../context/LanguageContext'

export const TopicSearchForm = React.memo(function TopicSearchForm({ onFocus, onSubmit }) {
  const { t } = useTranslation()
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
        placeholder={`${t('search')}:`}
        size="sm"
        value={query}
        onChange={handleChangeQuery}
        style={{ width: '120px' }}
      />
      &thinsp;
      <Button type="submit" size="sm">
        {t('search')}
      </Button>
    </Form>
  )
})
