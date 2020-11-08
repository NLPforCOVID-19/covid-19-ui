import React from 'react'

import { useTranslation } from '../context/LanguageContext'

const BaseIcon = ({ title, color, size, iconId }) => (
  <>
    <i className="material-icons" title={title || ''}>
      {iconId}
    </i>
    <style jsx>{`
      .material-icons {
        vertical-align: middle;
        color: ${color || 'var(--gray)'};
        font-size: ${size || '1em'};
      }
    `}</style>
  </>
)

export const Useful = ({ size }) => {
  const { t } = useTranslation()
  return <BaseIcon title={t('useful')} size={size} color="var(--yellow)" iconId="fiber_manual_record" />
}

export const Default = ({ size }) => {
  return <BaseIcon size={size} color="#A9A9A9" iconId="fiber_manual_record" />
}

export const Edit = ({ size }) => <BaseIcon size={size} iconId="edit" />
