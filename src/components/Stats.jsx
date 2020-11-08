import React from 'react'

import { useTranslation } from '../context/LanguageContext'

function numberWithPlusMinus(num) {
  const abs_str = Math.abs(num).toLocaleString()
  if (num === 0) {
    return '±0'
  }
  if (num > 0) {
    return `+${abs_str}`
  }
  return `-${abs_str}`
}

const Stats = ({ stats }) => {
  const { t } = useTranslation()
  return (
    <span>
      {t('感染者')}: {stats.confirmation_total.toLocaleString()} ({numberWithPlusMinus(stats.confirmation_today)}) /{' '}
      {t('死亡者')}: {stats.death_total.toLocaleString()} ({numberWithPlusMinus(stats.death_today)})
    </span>
  )
}
export default Stats
