import React, { memo } from 'react'

import { useTranslation } from '../context/LanguageContext'

import { RegionStats } from '@src/types'

function numberWithPlusMinus(num: number) {
  const abs_str = Math.abs(num).toLocaleString()
  if (num === 0) {
    return '±0'
  }
  if (num > 0) {
    return `+${abs_str}`
  }
  return `-${abs_str}`
}

export const Stats: React.FC<{ stats: RegionStats }> = memo(({ stats }) => {
  const { t } = useTranslation()
  return (
    <span className="text-muted">
      {t('感染者')}: {stats.confirmTotal.toLocaleString()} ({numberWithPlusMinus(stats.confirmToday)}) / {t('死亡者')}:{' '}
      {stats.deathTotal.toLocaleString()} ({numberWithPlusMinus(stats.deathToday)})
    </span>
  )
})
Stats.displayName = 'Stats'
