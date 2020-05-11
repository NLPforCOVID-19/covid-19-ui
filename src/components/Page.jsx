import React from 'react';
import dayjs from 'dayjs';

import * as Icons from './Icons';

function makeTranslatedUrl(url) {
  const target_lang = 'ja';
  return `https://translate.google.com/translate?tl=${target_lang}&u=${url}`;
}

function EntryIcon({entry}) {
  if (entry.is_about_false_rumor === 1) {
    return <Icons.Rumor />
  }
  if (entry.is_useful === 2) {
    return <Icons.Useful/>
  }
  if (entry.is_useful === 1) {
    return null
  }
  return <Icons.NotVerified />
}

const Page = ({ entry, topic }) => {
  const topicData = entry.topics.find(t => t.name === topic);
  const snippet = topicData ? topicData.snippet : '';
  return (
    <li>
      <div className="icon"><EntryIcon entry={entry} /></div>
      <div className="news">
        <div className="title-wrap">
          <Title entry={entry} />
        </div>
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

const Title = ({ entry }) => {
  const MAX_LEN = 36;
  const isJp = entry.country === 'jp';
  const url = isJp ? entry.url : makeTranslatedUrl(entry.url);
  const day = dayjs(entry.orig.timestamp).format('MM/DD');
  const full_title = entry.ja_translated.title;
  const title = full_title.length < MAX_LEN ? full_title : full_title.slice(0, MAX_LEN).concat("...");
  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="text-info"
      >
        <span className="small date">[{day}]</span>
        {" "}{title}{" "}
      </a>
      {isJp || (
        <>
          <a
            href={entry.url}
            target="_blank"
            title="元の言語で表示する"
          >
            <span className="material-icons open-in-new">open_in_new</span>
          </a>
        </>
      )}
      <style jsx>{`
        .material-icons {
          font-size: 1em;
          vertical-align: middle;
        }
        .open-in-new {
          color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  )
};

const Snippet = ({ text }) => <div className="mb-2 small text-secondary">{text}</div>;

export default Page;
