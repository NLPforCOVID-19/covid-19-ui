import React from 'react';
import dayjs from 'dayjs';

import * as Icons from './Icons';
import meta from '@src/meta'

function makeTranslatedUrl(url) {
  const target_lang = 'ja';
  return `https://translate.google.com/translate?tl=${target_lang}&u=${url}`;
}

function EntryIcon({entry}) {
  if (entry.is_useful === 2) {
    return <Icons.Useful />
  }
  if (entry.is_useful === 1) {
    return <Icons.Verified />
  }
  return <Icons.NotVerified />
}

const Page = ({ entry, topic, region, onClickEdit }) => {
  const topicData = entry.topics.find(t => t.name === topic);
  const snippet = topicData ? topicData.snippet : '';
  function handleClickEdit(e) {
    e.preventDefault()
    onClickEdit()
  }
  return (
    <li>
      <div className="icon">
        <EntryIcon entry={entry} />
        <a href="#" onClick={handleClickEdit}><Icons.Edit /></a>
      </div>
      <div className="news">
        <Title entry={entry} region={region} />
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
  );
};

const Title = ({ entry, region }) => {
  const isJp = entry.country === 'jp';
  const url = isJp ? entry.url : makeTranslatedUrl(entry.url);
  const day = dayjs(entry.orig.timestamp).format('MM/DD');
  const title = entry.ja_translated.title;
  const isShowCountryName = region !== entry.country
  const isRumor = entry.is_about_false_rumor === 1
  return (
    <div className="wrap">
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className="text-info title"
      >
        <span className="small">[{day}]</span>
        {isRumor && <span>&thinsp;<mark className="small text-muted">デマに関する情報</mark></span>}
        {isShowCountryName && <span className="small">&thinsp;({meta.countryDisplayName[entry.country]})</span>}
        &thinsp;{title}
      </a>
      {isJp || (
        <a
          href={entry.url}
          target="_blank"
          rel="noopener"
          title="元の言語で表示する"
        >
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
};

const Snippet = ({ text }) => <div className="mb-2 small text-secondary">{text}</div>;

export default Page;
