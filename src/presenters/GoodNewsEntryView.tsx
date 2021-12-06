import React, { memo } from 'react'

import * as Icons from '@src/components/Icons'
import { useTranslation } from '@src/context/LanguageContext'

interface Props {
  title: string
  mainUrl: string
  date: string
  sourceName: string
  sourceUrl: string
  altUrl?: string
  country?: string
  renderIcon: () => React.ReactElement
}

export const GoodNewsEntryView: React.FC<Props> = memo((props) => {
  const { t } = useTranslation()
  const { title, mainUrl, date, sourceName, sourceUrl, altUrl, country, renderIcon } = props
  return (
    <div className="news">
      <div className="title text-info">
        <span className="icon">{renderIcon()}</span>
        <span className="small text-muted">[{date}]</span>
        <span className="small text-muted">&thinsp;({country})</span>
        <a href={mainUrl} target="_blank" rel="noreferrer">
          &thinsp;{title}
        </a>
        {altUrl && (
          <span className="ml-1">
            <a href={altUrl} target="_blank" rel="noreferrer" title={t('元の言語で表示')}>
              &thinsp;
              <Icons.OpenInNew />
            </a>
          </span>
        )}
        <span className="source small ml-3">
          <a href={`http://${sourceUrl}`} target="_blank" rel="noreferrer" className="text-muted">
            {sourceName}
          </a>
        </span>
      </div>
      <style jsx>{`
        .wrap {
          height: 100px;
          display: flex;
          flex-flow: column nowrap;
        }
        .header {
          font-size: 1.3rem;
        }
        .scroll {
          overflow-y: auto;
        }
        .scroll-observe {
          height: 1px;
        }
        mark {
          background-color: #ffee70;
        }
      `}</style>
    </div>
  )
})
GoodNewsEntryView.displayName = 'GoodNewsEntryView'
