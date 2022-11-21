import Link from 'next/link'
import React, { memo } from 'react'
import Container from 'react-bootstrap/Container'

import { useTranslation } from '../context/LanguageContext'

export const Description = memo(() => {
  // TODO: Use <Link> instead of <a> to perform as an SPA
  const { t, lang } = useTranslation()
  return (
    <div className="mt-3">
      <Container>
        <div className="text-dark">
          {t('description')}
          &nbsp;
          <Link href="/[lang]/about/" as={`/${lang}/about/`}>
            <a>{t('このサイトの使い方')}</a>
          </Link>
        </div>
      </Container>
    </div>
  )
})
Description.displayName = 'Description'
