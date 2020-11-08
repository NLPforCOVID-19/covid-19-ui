import React from 'react'
import Toast from 'react-bootstrap/Toast'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { postFeedback } from '../api'
import { useTranslation } from '../context/LanguageContext'

export const FeedbackToast = ({ show, onClose }) => {
  const [feedbackContent, setFeedbackContent] = React.useState('')
  const [submitButtonEnabled, setSubmitButtonEnabled] = React.useState(true)
  const [showThanks, setShowThanks] = React.useState(false)
  const { t } = useTranslation()
  function handleChangeContent(e) {
    setFeedbackContent(e.target.value)
  }
  async function handleSubmit(e) {
    e.preventDefault()
    setShowThanks(true)
    setSubmitButtonEnabled(false)
    await postFeedback(feedbackContent).catch((e) => {
      console.log(e)
    })
    onClose()
  }
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
                <Form.Control
                  value={feedbackContent}
                  onChange={handleChangeContent}
                  as="textarea"
                  required
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
}
