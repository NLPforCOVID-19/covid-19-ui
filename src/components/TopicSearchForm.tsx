import React, { useState, useCallback, memo } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useTranslation } from '../context/LanguageContext'

interface Props {
  onFocus: () => void
  onSubmit: (q: string) => void
}

export const TopicSearchForm: React.FC<Props> = memo(({ onFocus, onSubmit }) => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const handleChangeQuery = useCallback((e: React.FormEvent) => {
    setQuery((e.target as HTMLInputElement).value)
  }, [])
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(query)
    },
    [query, onSubmit]
  )
  return (
    <Form inline onSubmit={handleSubmit} className="mb-2">
      <Form.Control
        onFocus={onFocus}
        type="search"
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
TopicSearchForm.displayName = 'TopicSearchForm'
