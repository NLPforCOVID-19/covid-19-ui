import React from 'react'

import * as Icons from './Icons'
import { useTranslation } from '../context/LanguageContext'

const IndicatorLegends = () => {
  const { t } = useTranslation()
  return (
    <ul>
      <li>
        <Icons.Useful />
        <div className="text-secondary">{t('useful')}</div>
      </li>
      <style jsx>{`
        ul {
          list-style-type: none;
          padding: 0;
          margin: 0 0 10px;
          display: flex;
        }
        li {
          display: flex;
          align-items: center;
          margin: 0 10px;
        }
        div {
          font-size: 14px;
          margin-left: 5px;
        }
      `}</style>
    </ul>
  )
}

export default IndicatorLegends
