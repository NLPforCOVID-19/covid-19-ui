import React, { memo } from 'react'

import { useTranslation } from '../context/LanguageContext'

interface BaseIconProps {
  iconId: string
  title?: string
  color?: string
  size?: string
}

const BaseIcon: React.FC<BaseIconProps> = memo(({ title, color, size, iconId }) => (
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
))
BaseIcon.displayName = 'BaseIcon'

export const Useful = () => {
  const { t } = useTranslation()
  return <BaseIcon title={t('useful')} color="var(--yellow)" iconId="fiber_manual_record" />
}

export const Positive = () => {
  const { t } = useTranslation()
  return <BaseIcon title={t('positive')} color="var(--yellow)" iconId="fiber_manual_record" />
}

export const Default = () => {
  return <BaseIcon color="#A9A9A9" iconId="fiber_manual_record" />
}

export const Edit = () => <BaseIcon iconId="edit" />

export const OpenInNew = () => <BaseIcon iconId="open_in_new" />
