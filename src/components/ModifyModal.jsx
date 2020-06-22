import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { modifyRegionCategory } from '../api'
import { makeTranslatedUrl } from '../utils'
import Loading from './Loading'

export const ModifyModal = ({ show, onHide, regions, topics, entry }) => {
  if (!entry) {
    return null
  }
  const isJp = entry.country === 'jp'

  const currentRegion = entry.country

  const currentTopics = entry.topics.filter(t => topics.includes(t.name))
  const [region, setRegion] = useState(currentRegion)
  const initialTopicState = {}
  for (const topicName of topics) {
    initialTopicState[topicName] = !!currentTopics.find(t => t.name === topicName)
  }
  const [selectedTopics, setSelectedTopics] = useState(initialTopicState)

  const [isRequesting, setIsRequesting] = useState(false)
  const [failed, setFailed] = useState(false)
  const isChangedFromCurrent = !(currentRegion === region && JSON.stringify(initialTopicState) === JSON.stringify(selectedTopics))

  function handleChangeRegion(e) {
    setRegion(e.target.value)
  }
  function handleChangeTopic(e) {
    const targetTopic = e.target.value
    const checked = e.target.checked
    setSelectedTopics(prev => ({
      ...prev,
      [targetTopic]: checked
    }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    setIsRequesting(true)
    modifyRegionCategory(entry.url, region, currentTopics)
      .then(res => {
        console.log(res)
        onHide()
      })
      .catch(err => {
        console.log(err)
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
              <a href={isJp ? entry.url : makeTranslatedUrl(entry.url)}>{entry.ja_translated.title}</a>
              {' '}
              {isJp || (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener"
                  title="元の言語で表示する"
                >
                  <span className="material-icons open-in-new">open_in_new</span>
                </a>
              )
              }
            </div>
            <div>地域: {regions.find(r => r.id === currentRegion)?.name}</div>
            <div>カテゴリ:</div>
            <ul>
              {currentTopics.map(t => (
                <li key={t.name}>
                  <span>{t.name}</span>
                  <br />
                  <span className="text-secondary snippet">{t.snippet}</span>
                </li>
              ))}
            </ul>
            <style jsx>{`
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
            `}</style>
          </div>
          <Form.Group>
            <Form.Label>修正後の地域</Form.Label>
            <Form.Control as="select" value={region} onChange={handleChangeRegion}>
              {regions.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <fieldset>
            <Form.Group>
              <Form.Label as="legend">修正後のカテゴリ</Form.Label>
              {topics.map(t => (
                <Form.Check
                  key={t}
                >
                  <Form.Check.Label>
                    <Form.Check.Input
                      type="checkbox"
                      value={t}
                      checked={selectedTopics[t]}
                      onChange={handleChangeTopic}
                    />
                    {t}
                  </Form.Check.Label>
                </Form.Check>
              ))}
            </Form.Group>
          </fieldset>
          {failed && <Alert variant="danger">修正に失敗しました。</Alert>}
        </Modal.Body>
        <Modal.Footer>
          {isRequesting && <Loading />}
          {!isRequesting && (
            <>
              <Button variant="secondary" onClick={onHide}>キャンセル</Button>
              <Button variant="primary" type="submit" disabled={!isChangedFromCurrent}>確定</Button>
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
  regions: PropTypes.arrayOf(PropTypes.string).isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  entry: PropTypes.object
}
