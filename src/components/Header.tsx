import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'

import { useTranslation } from '../context/LanguageContext'
import { localeList } from '../translations'

import { Lang } from '@src/types'

const LangLink: React.FC<{ lang: Lang; currentLang: Lang; className: string }> = ({ lang, currentLang, className }) => {
  const displayLanguageNames = {
    en: 'English',
    ja: '日本語'
  }
  if (lang !== currentLang) {
    return (
      <a className={className} href={`${process.env.BASE_PATH}/${lang}/`}>
        {displayLanguageNames[lang]}
      </a>
    )
  }
  return (
    <>
      <span className={className}>{displayLanguageNames[lang]}</span>
      <style jsx>{`
        span {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

export const Header = () => {
  const { t, lang } = useTranslation()
  return (
    <div>
      <div className="bg-info pt-1 pb-1">
        <Container>
          <Row>
            <Col>
              <h3 className="mb-1">
                <Link href="/[lang]/" as={`/${lang}/`}>
                  <a className="text-white">{t('title')}</a>
                </Link>
              </h3>
            </Col>
            <Col sm={2} className="text-right">
              {localeList.map((locale) => (
                <span key={locale}>
                  <LangLink className="text-white" lang={locale} currentLang={lang} />
                  <style jsx>{`
                    span {
                      margin-left: 10px;
                    }
                  `}</style>
                </span>
              ))}
            </Col>
          </Row>
          <Row>
            <div className="small mt-0 text-white">
              <a href="http://nlp.ist.i.kyoto-u.ac.jp/" className="text-white">
                {t('lab_kurohashi')}
              </a>
              ,{' '}
              <a href="http://nlp-waseda.jp/" className="text-white">
                {t('lab_kawahara')}
              </a>
              ,{' '}
              <a href="http://www.tkl.iis.u-tokyo.ac.jp/new/" className="text-white">
                {t('lab_kitsuregawa')}
              </a>
              ,{' '}
              <a href="https://mynlp.is.s.u-tokyo.ac.jp/ja/index" className="text-white">
                {t('lab_miyao')}
              </a>
              ,{' '}
              <a href="http://www-al.nii.ac.jp/ja/" className="text-white">
                {t('lab_aizawa')}
              </a>
              ,{' '}
              <a href="https://www.nlp.ecei.tohoku.ac.jp/" className="text-white">
                {t('lab_inui')}
              </a>
              ,{' '}
              <a href="http://fusioncomplab.org/" className="text-white">
                {t('lab_morishima')}
              </a>
              .{' '}
              <a href="https://mt-auto-minhon-mlt.ucri.jgn-x.jp" className="text-white">
                Powered by みんなの自動翻訳 (NICT).
              </a>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  )
}
