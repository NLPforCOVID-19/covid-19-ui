import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import React, { useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

import { EditFormAction, EditFormState } from '@src/containers/EditModalContainer'
import { Loading } from '@src/components/Loading'
import { useTranslation } from '@src/context/LanguageContext'
import { countryIds, SubmitState } from '@src/types'
import { selectTopics } from '@src/redux/regionsTopics'

interface ListUrl {
  text: string
  url: string
}
interface Props {
  onSubmit: () => void
  onHide: () => void
  urls: ListUrl[]
  title: string
  country: string
  snippets: Record<string, string>
  state: EditFormState
  submitStatus: SubmitState
  dispatch: (a: EditFormAction) => void
  renderHistory: () => React.ReactElement
}

export const EditModal: React.FC<Props> = (props) => {
  const { state, dispatch, onSubmit } = props
  const { t } = useTranslation()
  const topics = useSelector(selectTopics)
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit()
    },
    [onSubmit]
  )
  const handleChangeTopic = useCallback(
    (e: React.FormEvent) => {
      const t = e.target as HTMLInputElement
      dispatch({ type: 'topics', payload: { topic: t.name, checked: t.checked } })
    },
    [dispatch]
  )
  return (
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>地域とカテゴリの修正</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.title}</h4>
        <ul>
          {props.urls.map(({ text, url }) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noreferrer">
                {text}
              </a>
            </li>
          ))}
        </ul>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="COVID-19関連"
            checked={state.flags.aboutCovid}
            onChange={(e) => dispatch({ type: 'aboutCovid', payload: (e.target as HTMLInputElement).checked })}
            inline
          />
          <Form.Check
            type="checkbox"
            label="特に役に立つ"
            checked={state.flags.useful}
            onChange={(e) => dispatch({ type: 'useful', payload: (e.target as HTMLInputElement).checked })}
            inline
          />
          <Form.Check
            type="checkbox"
            label="デマに関する情報"
            checked={state.flags.aboutRumor}
            onChange={(e) => dispatch({ type: 'aboutRumor', payload: (e.target as HTMLInputElement).checked })}
            inline
          />
          <Form.Check
            type="checkbox"
            label="非表示にする"
            checked={state.flags.hidden}
            onChange={(e) => dispatch({ type: 'hidden', payload: (e.target as HTMLInputElement).checked })}
            inline
          />
        </Form.Group>
        <hr />
        <h5>地域: {t(props.country)}</h5>
        <Form.Group>
          <Form.Label>地域を修正する</Form.Label>
          <Form.Control
            as="select"
            value={state.country}
            onChange={(e) => dispatch({ type: 'country', payload: e.target.value })}
          >
            {countryIds.map((country) => (
              <option key={country} value={country}>
                {t(country)}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <hr />
        <h5>カテゴリ:</h5>
        <ul>
          {Object.keys(props.snippets).map((topic) => (
            <li key={topic}>
              <span>{topic}</span>
              <br />
              <span className="text-secondary snippet">{props.snippets[topic]}</span>
            </li>
          ))}
        </ul>
        <Form.Group>
          <Form.Label>カテゴリを修正する</Form.Label>
          <br />
          {topics.map((t) => (
            <Form.Check key={t} inline>
              <Form.Check.Label>
                <Form.Check.Input
                  type="checkbox"
                  name={t}
                  checked={state.topics.includes(t)}
                  onChange={handleChangeTopic}
                />
                {t}
              </Form.Check.Label>
            </Form.Check>
          ))}
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Label>メモ欄</Form.Label>
          <Form.Control
            as="textarea"
            value={state.notes}
            onChange={(e) => dispatch({ type: 'notes', payload: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>パスワード</Form.Label>
          <Form.Control
            type="password"
            value={state.password}
            required
            onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
          />
        </Form.Group>
        <hr />
        {props.renderHistory()}
      </Modal.Body>
      <Modal.Footer>
        {props.submitStatus === 'rejected' && <Alert variant="danger">Failed to modify.</Alert>}
        {props.submitStatus === 'pending' && <Loading />}
        {props.submitStatus !== 'pending' && (
          <>
            <Button variant="secondary" onClick={props.onHide}>
              キャンセル
            </Button>
            &ensp;
            <Button variant="primary" type="submit">
              確定
            </Button>
          </>
        )}
      </Modal.Footer>
    </Form>
  )
}
