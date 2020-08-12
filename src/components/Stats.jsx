import React from 'react'

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

const Stats = ({ stats }) => (
  <span>
    感染者: {stats.confirmation_total.toLocaleString()} ({numberWithPlusMinus(stats.confirmation_today)}) / 死亡者:{' '}
    {stats.death_total.toLocaleString()} ({numberWithPlusMinus(stats.death_today)})
  </span>
)

export default Stats
