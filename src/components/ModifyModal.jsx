import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { modifyRegionCategory } from '../api'
import { makeTranslatedUrl } from '../utils'
import Loading from './Loading'

export const ModifyModal = ({ show, onHide, countries, topics, entry }) => {
  if (!entry) {
    return null
  }
  const isJp = entry.country === 'jp'

  const currentTopics = entry.topics.filter((t) => topics.includes(t.name))

  const [isAboutCovid, setIsAboutCovid] = useState(true)
  const [isUseful, setIsUseful] = useState(false)
  const [notes, setNotes] = useState('')
  const [isAboutRumor, setIsAboutRumor] = useState(false)
  const [selectedCounrty, setSelectedCountry] = useState('')
  useEffect(() => {
    setIsAboutRumor(entry.is_about_false_rumor)
    setIsUseful(entry.is_useful === 1)
    setIsAboutCovid(true)
    setSelectedCountry(entry.country)
  }, [entry.url])

  const initialTopicState = {}
  for (const topicName of topics) {
    initialTopicState[topicName] = !!currentTopics.find((t) => t.name === topicName)
  }
  const [selectedTopics, setSelectedTopics] = useState(initialTopicState)
  useEffect(() => {
    setSelectedTopics(initialTopicState)
  }, [entry.topics])

  const [isChangedFromCurrent, setIsChangedFromCurrent] = useState(false)
  useEffect(() => {
    const changedCountry = entry.country !== selectedCounrty
    const changedTopic = JSON.stringify(initialTopicState) !== JSON.stringify(selectedTopics)
    const changedUseful = isUseful !== (entry.is_useful === 1)
    const changedAboutRumor = isAboutRumor !== entry.is_about_false_rumor
    const isChanged = changedCountry || changedTopic || changedUseful || !isAboutCovid || changedAboutRumor
    setIsChangedFromCurrent(isChanged)
  }, [entry.url, selectedTopics, selectedCounrty, isUseful, isAboutCovid, isAboutRumor])

  const [password, setPassword] = useState('')
  const [isRequesting, setIsRequesting] = useState(false)
  const [failed, setFailed] = useState(false)

  function handleChangeRegion(e) {
    setSelectedCountry(e.target.value)
  }
  function handleChangeTopic(e) {
    const targetTopic = e.target.name
    const checked = e.target.checked
    setSelectedTopics((prev) => ({
      ...prev,
      [targetTopic]: checked
    }))
  }
  function handleChangePassword(e) {
    setPassword(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    setIsRequesting(true)
    const newTopics = topics.filter((t) => selectedTopics[t])
    modifyRegionCategory(entry.url, selectedCounrty, newTopics, isUseful, isAboutCovid, isAboutRumor, notes, password)
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
  }
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
                href={isJp ? entry.url : makeTranslatedUrl(entry.url)}
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
            <div>地域: {countries.find((r) => r.id === entry.country)?.name}</div>
            <div>カテゴリ:</div>
            <ul>
              {currentTopics.map((t) => (
                <li key={t.name}>
                  <span>{t.name}</span>
                  <br />
                  <span className="text-secondary snippet">{t.snippet}</span>
                </li>
              ))}
            </ul>
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
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="COVID-19関連"
              checked={isAboutCovid}
              onChange={(e) => setIsAboutCovid(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="役に立つ"
              checked={isUseful}
              onChange={(e) => setIsUseful(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="デマに関する情報"
              checked={isAboutRumor}
              onChange={(e) => setIsAboutRumor(e.target.checked)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>修正後の地域</Form.Label>
            <Form.Control as="select" value={selectedCounrty} onChange={handleChangeRegion}>
              {countries.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <fieldset>
            <Form.Group>
              <Form.Label as="legend">修正後のカテゴリ</Form.Label>
              {topics.map((t) => (
                <Form.Check key={t}>
                  <Form.Check.Label>
                    <Form.Check.Input
                      type="checkbox"
                      name={t}
                      checked={selectedTopics[t]}
                      onChange={handleChangeTopic}
                    />
                    {t}
                  </Form.Check.Label>
                </Form.Check>
              ))}
            </Form.Group>
            <Form.Group>
              <Form.Label>メモ欄</Form.Label>
              <Form.Control as="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" required onChange={handleChangePassword} />
            </Form.Group>
          </fieldset>
          {failed && <Alert variant="danger">修正に失敗しました。</Alert>}
        </Modal.Body>
        <Modal.Footer>
          {isRequesting && <Loading />}
          {!isRequesting && (
            <>
              <Button variant="secondary" onClick={onHide}>
                キャンセル
              </Button>
              <Button variant="primary" type="submit" disabled={!isChangedFromCurrent}>
                確定
              </Button>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

ModifyModal.protoTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  entry: PropTypes.object
}
