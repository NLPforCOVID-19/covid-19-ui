import React from 'react'

import * as Icons from '@src/components/Icons'
import { useTranslation } from '@src/context/LanguageContext'

interface Props {
  title: string
  mainUrl: string
  date: string
  sourceName: string
  sourceUrl: string
  renderSnippet: () => React.ReactElement
  altUrl?: string
  mark?: string
  country?: string
  renderIcon: () => React.ReactElement
}

export const EntryView: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const { title, mainUrl, date, sourceName, sourceUrl, renderSnippet, altUrl, mark, country, renderIcon } = props
  return (
    <div className="wrap">
      <div className="icon">{renderIcon()}</div>
      <div className="news">
        <div className="title text-info">
          <span className="small text-muted">[{date}]</span>
          {mark && (
            <span>
              &thinsp;<mark className="small text-muted">{mark}</mark>
            </span>
          )}
          {country && <span className="small text-muted">&thinsp;({country})</span>}
          <a href={mainUrl} target="_blank" rel="noreferrer" className="text-info">
            &thinsp;{title}
          </a>
          {altUrl && (
            <a href={altUrl} target="_blank" rel="noreferrer" title={t('元の言語で表示')}>
              <Icons.OpenInNew />
            </a>
          )}
        </div>
        <div className="source small">
          <a href={sourceUrl} target="_blank" rel="noreferrer" className="text-muted">
            {sourceName}
          </a>
        </div>
        <div className="snippet small text-secondary">{renderSnippet()}</div>
      </div>
      <style jsx>{`
        .wrap {
          display: flex;
          padding: 3px;
        }
        .icon {
          flex: 0 0 16px;
          margin-right: 3px;
        }
        .title {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        mark {
          background-color: #ffee70;
        }
        .source > a {
          text-decoration: underline;
        }
        .snippet {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  )
}
