import React, { memo } from 'react'

import { useTranslation } from '../context/LanguageContext'

export const Footer = memo(() => {
  const { t } = useTranslation()
  return (
    <footer className="mt-3 p-3 bg-light">
      <p className="text-muted text-center">
        &copy; 2020 NLPforCOVID-19. {t('お問い合わせ')} nlpforcovid-19 (at) nlp.ist.i.kyoto-u.ac.jp
      </p>
    </footer>
  )
})
Footer.displayName = 'Footer'
