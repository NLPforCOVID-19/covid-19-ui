import React, { memo, useCallback, useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { postFeedback } from '../api'
import { useTranslation } from '../context/LanguageContext'

const feedbackRadioChoices = ['yes', 'no']

interface Props {
  show: boolean
  onClose: () => void
}

export const FeedbackToast: React.FC<Props> = memo(({ show, onClose }) => {
  const [feedbackContent, setFeedbackContent] = useState('')
  const [feedbackUseful, setFeedbackUseful] = useState('')
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(true)
  const [showThanks, setShowThanks] = useState(false)
  const { t } = useTranslation()
  const handleChangeContent = useCallback((e: React.FormEvent) => {
    setFeedbackContent((e.target as HTMLTextAreaElement).value)
  }, [])
  const handleChangeRadio = useCallback((e: React.FormEvent) => {
    setFeedbackUseful((e.target as HTMLInputElement).value)
  }, [])
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setShowThanks(true)
      setSubmitButtonEnabled(false)
      await postFeedback(`useful: ${feedbackUseful}, comment: ${feedbackContent}`).catch()
      onClose()
    },
    [feedbackContent, feedbackUseful, onClose]
  )

  return (
    <div className="toast-wrap">
      <Toast show={show} onClose={onClose}>
        <Toast.Header>
          <strong className="mr-auto">{t('feedback')}</strong>
        </Toast.Header>
        <Toast.Body>
          {!showThanks && (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>{t('feedback_useful')}</Form.Label>
                <br />
                {feedbackRadioChoices.map((c) => (
                  <Form.Check
                    key={c}
                    type="radio"
                    name="useful"
                    value={c}
                    label={t(c)}
                    onChange={handleChangeRadio}
                    checked={feedbackUseful === c}
                    inline
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  value={feedbackContent}
                  onChange={handleChangeContent}
                  as="textarea"
                  rows={3}
                  placeholder={t('feedback_placeholder')}
                />
              </Form.Group>
              <Button variant="secondary" type="submit" disabled={!submitButtonEnabled}>
                {t('submit')}
              </Button>
            </Form>
          )}
          {showThanks && <span>Thanks!</span>}
        </Toast.Body>
      </Toast>
      <style jsx>{`
        .toast-wrap {
          position: fixed;
          top: 10px;
          right: 10px;
          z-index: 100;
          width: 300px;
        }
      `}</style>
    </div>
  )
})
FeedbackToast.displayName = 'FeedbackToast'
