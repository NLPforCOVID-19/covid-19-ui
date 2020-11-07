import Toast from 'react-bootstrap/Toast'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const SurveyToast = ({ show, onClose }) => {
  return (
    <div className="toast-wrap">
      <Toast show={show} onClose={onClose}>
        <Toast.Header>
          <strong className="mr-auto">フィードバック</strong>
        </Toast.Header>
        <Toast.Body>
          <Form>
            <Form.Group>
              <Form.Control as="textarea" rows={3} placeholder="このサイトへのご意見等あれば入力してください。" />
            </Form.Group>
            <Button variant="secondary" type="submit">
              送信
            </Button>
          </Form>
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
