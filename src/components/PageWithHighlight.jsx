import React from 'react'
import dayjs from 'dayjs'

import * as Icons from './Icons'
import { makeTranslatedUrl } from '../utils'
import { useTranslation } from '../context/LanguageContext'

function EntryIcon({ entry }) {
  if (entry.is_useful) {
    return <Icons.Useful />
  } else {
    return <Icons.Default />
  }
}

const PageWithHighlight = ({ entry, topic, region, onClickEdit, showEditButton, highlightQuery }) => {
  const topicData = entry.topics.find((t) => t.name === topic)
  const snippet = topicData ? topicData.snippet : ''
  function handleClickEdit(e) {
    e.preventDefault()
    onClickEdit()
  }
  return (
    <li>
      <div className="icon">
        <EntryIcon entry={entry} />
        {showEditButton && (
          <a href="#" onClick={handleClickEdit}>
            <Icons.Edit />
          </a>
        )}
      </div>
      <div className="news">
        <Title entry={entry} region={region} />
        <Domain entry={entry} />
        <Snippet text={snippet} highlightQuery={highlightQuery} />
      </div>
      <style jsx>{`
        li {
          display: flex;
        }
        .icon {
          flex: 0 0 16px;
          margin-right: 3px;
        }
      `}</style>
    </li>
  )
}

const Title = ({ entry, region }) => {
  const { t, lang } = useTranslation()
  const needsTranslation =
    (lang === 'ja' && entry.displayed_country === 'jp') || (lang === 'en' && entry.displayed_country === 'us')
  const url = needsTranslation ? entry.url : makeTranslatedUrl(entry.url, lang)
  const day = dayjs(entry.orig.timestamp).format('MM/DD')
  const title = entry.translated.title
  const isShowCountryName = region !== entry.displayed_country
  const isRumor = entry.is_about_false_rumor === 1
  return (
    <div className="wrap">
      <span className="title">
        <span className="small text-muted">[{day}]&thinsp;</span>
        {isRumor && (
          <span>
            &thinsp;<mark className="small text-muted">{t('false_rumor')}</mark>
          </span>
        )}
        {isShowCountryName && <span className="small text-muted">&thinsp;({t(entry.displayed_country)})</span>}
        <a href={url} target="_blank" rel="noopener" className="text-info">
          &thinsp;{title}
        </a>
      </span>
      {needsTranslation || (
        <a href={entry.url} target="_blank" rel="noopener" title={t('元の言語で表示')}>
          <span className="material-icons open-in-new">open_in_new</span>
        </a>
      )}
      <style jsx>{`
        .wrap {
          display: flex;
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
        .material-icons {
          font-size: 1em;
          vertical-align: middle;
        }
        .open-in-new {
          color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  )
}

const Domain = ({ entry }) => {
  return (
    <div className="m-0 small">
      <a href={`http://${entry.domain}`} target="_blank" rel="noopener" className="small text-muted">
        <u>{entry.domain_label}</u>
      </a>
    </div>
  )
}

const Snippet = ({ text, highlightQuery }) => {
  return (
    <div className="wrap">
      <div className="mb-2 small text-secondary">
        <span className="snippet">
          {text.split(highlightQuery).map((str, i) =>
            i === 0 ? (
              <span key={i}>{str}</span>
            ) : (
              <span key={i}>
                <mark className="">{highlightQuery}</mark>
                {str}
              </span>
            )
          )}
        </span>
      </div>
      <style jsx>{`
        .wrap {
          display: flex;
        }
        .snippet {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        mark {
          background-color: yellow;
        }
      `}</style>
    </div>
  )
}

export default PageWithHighlight
