import React, { useState, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import dayjs from 'dayjs'

import { fetchHistory, modifyRegionCategory } from '../api'
import { makeTranslatedUrl } from '../utils'

import Loading from './Loading'

function initializeFormState(entry) {
  return {
    aboutCovid: true,
    hidden: false,
    useful: entry.is_useful === 1,
    aboutRumor: entry.is_about_false_rumor === 1,
    country: entry.displayed_country,
    topics: entry.topics.map((t) => t.name),
    notes: '',
    password: ''
  }
}

const formActionType = {
  ABOUT_COVID: 'ABOUT_COVID',
  HIDDEN: 'HIDDEN',
  USEFUL: 'USEFUL',
  ABOUT_RUMOR: 'ABOUT_RUMOR',
  COUNTRY: 'COUNTRY',
  TOPICS: 'TOPICS',
  NOTES: 'NOTES',
  PASSWORD: 'PASSWORD'
}

function modifyFormReducer(state, action) {
  const t = formActionType
  const { type, payload } = action
  switch (type) {
    case t.ABOUT_COVID:
      return { ...state, aboutCovid: payload }
    case t.HIDDEN:
      return { ...state, hidden: payload }
    case t.USEFUL:
      return { ...state, useful: payload }
    case t.ABOUT_RUMOR:
      return { ...state, aboutRumor: payload }
    case t.COUNTRY:
      return { ...state, country: payload }
    case t.TOPICS: {
      const { topic, checked } = payload
      const topicSet = new Set(state.topics)
      checked ? topicSet.add(topic) : topicSet.delete(topic)
      return { ...state, topics: [...topicSet] }
    }
    case t.NOTES:
      return { ...state, notes: payload }
    case t.PASSWORD:
      return { ...state, password: payload }
    default:
      return state
  }
}

function submit(url, state) {
  return modifyRegionCategory(url, state, state.notes, state.password)
}

export const ModifyModal = ({ show, onHide, countries, topics, entry }) => {
  const isJp = entry.displayed_country === 'jp'
  const [formState, dispatch] = useReducer(modifyFormReducer, entry, initializeFormState)
  const [isRequesting, setIsRequesting] = useState(false)
  const [failed, setFailed] = useState(false)
  const [history, setHistory] = useState(null)
  useEffect(() => {
    fetchHistory(entry.url)
      .then((h) => setHistory(h))
      .catch(() => setHistory('error'))
  }, [entry.url])
  const handleChangeTopic = React.useCallback(
    (e) => {
      dispatch({ type: formActionType.TOPICS, payload: { topic: e.target.name, checked: e.target.checked } })
    },
    [dispatch]
  )
  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault()
      setIsRequesting(true)
      submit(entry.url, formState)
        .then(() => {
          onHide()
        })
        .catch(() => {
          setFailed(true)
          setTimeout(() => setFailed(false), 3000)
        })
        .finally(() => {
          setIsRequesting(false)
        })
    },
    [entry.url, formState]
  )
  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>地域とカテゴリの修正</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            <div className="mb-2">
              <a
                className="title"
                href={isJp ? entry.url : makeTranslatedUrl(entry.url, 'ja')}
                target="_blank"
                rel="noopener"
              >
                {entry.translated.title}
              </a>{' '}
              {isJp || (
                <a href={entry.url} target="_blank" rel="noopener" title="元の言語で表示する">
                  <span className="material-icons open-in-new">open_in_new</span>
                </a>
              )}
            </div>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="COVID-19関連"
                checked={formState.aboutCovid}
                onChange={(e) => dispatch({ type: formActionType.ABOUT_COVID, payload: e.target.checked })}
              />
              <Form.Check
                type="checkbox"
                label="特に役に立つ"
                checked={formState.useful}
                onChange={(e) => dispatch({ type: formActionType.USEFUL, payload: e.target.checked })}
              />
              <Form.Check
                type="checkbox"
                label="デマに関する情報"
                checked={formState.aboutRumor}
                onChange={(e) => dispatch({ type: formActionType.ABOUT_RUMOR, payload: e.target.checked })}
              />
              <Form.Check
                type="checkbox"
                label="非表示にする"
                checked={formState.hidden}
                onChange={(e) => dispatch({ type: formActionType.HIDDEN, payload: e.target.checked })}
              />
            </Form.Group>
            <hr />
            <div>地域: {countries.find((r) => r.id === entry.displayed_country)?.name}</div>
            <Form.Group>
              <Form.Label>地域を修正する</Form.Label>
              <Form.Control
                as="select"
                value={formState.country}
                onChange={(e) => dispatch({ type: formActionType.COUNTRY, payload: e.target.value })}
              >
                {countries.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <hr />
            <div>カテゴリ:</div>
            <ul>
              {entry.topics.map((t) => (
                <li key={t.name}>
                  <span>{t.name}</span>
                  <br />
                  <span className="text-secondary snippet">{t.snippet}</span>
                </li>
              ))}
            </ul>
            <Form.Group>
              <Form.Label>カテゴリを修正する</Form.Label>
              {topics.map((t) => (
                <Form.Check key={t}>
                  <Form.Check.Label>
                    <Form.Check.Input
                      type="checkbox"
                      name={t}
                      checked={formState.topics.includes(t)}
                      onChange={handleChangeTopic}
                    />
                    {t}
                  </Form.Check.Label>
                </Form.Check>
              ))}
            </Form.Group>
            <style jsx>{`
              .title {
                font-size: 1.2em;
              }
              li {
                margin: 3px 0;
              }
              .snippet {
                font-size: 0.9em;
              }
              .material-icons {
                font-size: 1em;
                vertical-align: middle;
              }
              .open-in-new {
                color: rgba(0, 0, 0, 0.5);
              }
              legend {
                font-size: 1em;
              }
            `}</style>
          </div>
          <hr />
          <Form.Group>
            <Form.Label>メモ欄</Form.Label>
            <Form.Control
              as="textarea"
              value={formState.notes}
              onChange={(e) => dispatch({ type: formActionType.NOTES, payload: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>パスワード</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => dispatch({ type: formActionType.PASSWORD, payload: e.target.value })}
            />
          </Form.Group>
          {failed && <Alert variant="danger">修正に失敗しました。</Alert>}
          <HistoryDiv history={history} />
        </Modal.Body>
        <Modal.Footer>
          {isRequesting && <Loading />}
          {!isRequesting && (
            <>
              <Button variant="secondary" onClick={onHide}>
                キャンセル
              </Button>
              <Button variant="primary" type="submit">
                確定
              </Button>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

const HistoryDiv = ({ history }) => {
  if (history === null) {
    return <div>読み込み中...</div>
  }
  if (history === 'error') {
    return <div>履歴を読み込めませんでした</div>
  }
  if (history.is_checked === 0) {
    return <div>編集されていません</div>
  }
  return (
    <div>
      <div>編集されました</div>
      <ul>
        <li>いつ: {dayjs(history.time).format('YYYY/MM/DD HH:mm:ss')}</li>
        <li>メモ: {history.notes}</li>
      </ul>
    </div>
  )
}

ModifyModal.protoTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  entry: PropTypes.object
}
