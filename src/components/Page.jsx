import React from 'react'
import dayjs from 'dayjs'

import * as Icons from './Icons'
import meta from '@src/meta'
import { makeTranslatedUrl } from '../utils'
import { useTranslation } from '../context/LanguageContext'

function EntryIcon({ entry }) {
  if (entry.is_useful) {
    return <Icons.Useful />
  }
  return null
}

const Page = ({ entry, topic, region, onClickEdit, showEditButton }) => {
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
        <Snippet text={snippet} />
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
  const { t } = useTranslation()
  const isJp = entry.country === 'jp'
  const url = isJp ? entry.url : makeTranslatedUrl(entry.url)
  const day = dayjs(entry.orig.timestamp).format('MM/DD')
  const title = entry.ja_translated.title
  const isShowCountryName = region !== entry.country
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
        {isShowCountryName && <span className="small text-muted">&thinsp;({t(entry.country)})</span>}
        <a href={url} target="_blank" rel="noopener" className="text-info">
          &thinsp;{title}
        </a>
      </span>
      {isJp || (
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

const Snippet = ({ text }) => <div className="mb-2 small text-secondary">{text}</div>

export default Page
