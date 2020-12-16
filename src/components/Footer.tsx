import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

import { useTranslation } from '../context/LanguageContext'

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="mt-3 p-3 bg-light">
      <Container>
        <Row>
          <Col>
            <a href="http://nlp.ist.i.kyoto-u.ac.jp/" className="text-muted">
              {t('lab_kurohashi')}
            </a>
            ,{' '}
            <a href="http://nlp-waseda.jp/" className="text-muted">
              {t('lab_kawahara')}
            </a>
            ,{' '}
            <a href="http://www.tkl.iis.u-tokyo.ac.jp/new/" className="text-muted">
              {t('lab_kitsuregawa')}
            </a>
            ,{' '}
            <a href="https://mynlp.is.s.u-tokyo.ac.jp/ja/index" className="text-muted">
              {t('lab_miyao')}
            </a>
            ,{' '}
            <a href="http://www-al.nii.ac.jp/ja/" className="text-muted">
              {t('lab_aizawa')}
            </a>
            ,{' '}
            <a href="https://www.nlp.ecei.tohoku.ac.jp/" className="text-muted">
              {t('lab_inui')}
            </a>
            ,{' '}
            <a href="http://fusioncomplab.org/" className="text-muted">
              {t('lab_morishima')}
            </a>
            . Powered by{' '}
            <a href="https://mt-auto-minhon-mlt.ucri.jgn-x.jp" className="text-muted">
              みんなの自動翻訳 (NICT).
            </a>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="text-muted text-center">
            &copy; 2020 NLPforCOVID-19. {t('お問い合わせ')} nlpforcovid-19 (at) nlp.ist.i.kyoto-u.ac.jp
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
