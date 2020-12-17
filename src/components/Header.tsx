import React, { memo } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'

import { useTranslation } from '../context/LanguageContext'
import { localeList } from '../translations'

import { Lang } from '@src/types'

const LangLink: React.FC<{ lang: Lang; currentLang: Lang; className: string }> = memo(
  ({ lang, currentLang, className }) => {
    const displayLanguageNames = {
      en: 'English',
      ja: '日本語'
    }
    if (lang !== currentLang) {
      return (
        <a className={className} href={`${process.env.NEXT_PUBLIC_BASE_PATH}/${lang}/`}>
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
)
LangLink.displayName = 'LangLink'

export const Header = () => {
  const { t, lang } = useTranslation()
  return (
    <header className="bg-info pt-2 pb-2">
      <Container>
        <Row>
          <Col sm={10}>
            <h3 className="mb-1">
              <Link href="/[lang]/" as={`/${lang}/`}>
                <a className="text-white">{t('title')}</a>
              </Link>
            </h3>
          </Col>
          <Col sm={2} className="text-right">
            <div className="locals">
              {localeList.map((locale) => (
                <span key={locale} className="local-item">
                  <LangLink className="text-white" lang={locale} currentLang={lang} />
                </span>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .locals {
          height: 100%;
          display: flex;
          align-items: center;
        }
        .local-item {
          margin-left: 10px;
        }
      `}</style>
    </header>
  )
}
