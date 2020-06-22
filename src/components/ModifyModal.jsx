import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { modifyRegionCategory } from '../api'

export const ModifyModal = ({ show, onHide, regions, entry }) => {
  if (!entry) {
    return null
  }
  const currentRegion = entry.country
  const currentTopics = entry.topics.map(t => t.name)
  const [region, setRegion] = useState(currentRegion)
  const isChangedFromCurrent = currentRegion !== region
  function handleChangeRegion(e) {
    setRegion(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    modifyRegionCategory(entry.url, region, currentTopics)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>地域とカテゴリの修正</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>修正後の地域</Form.Label>
            <Form.Control as="select" value={region} onChange={handleChangeRegion}>
              {regions.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        {/* <Form.Group>
          <Form.Label>修正後のカテゴリ</Form.Label>
          <Form.Control as="select" multiple>
            {topics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Form.Control>
        </Form.Group> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>キャンセル</Button>
          <Button variant="primary" type="submit" disabled={!isChangedFromCurrent}>確定</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

ModifyModal.protoTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  regions: PropTypes.arrayOf(PropTypes.string).isRequired,
  entry: PropTypes.object
}
