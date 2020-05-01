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
  const isJp = entry.country === 'jp';
  const topicData = entry.topics.find(t => t.name === topic);
  const snippet = topicData ? topicData.snippet : '';
  return (
    <li>
      <div>
        <a
          href={isJp ? entry.url : makeTranslatedUrl(entry.url)}
          target="_blank"
          rel="noreferrer noopener"
          className="text-info"
        >
          <span className="icon">
            <EntryIcon entry={entry} />
          </span>
          <span className="small date">[{dayjs(entry.orig.timestamp).format('MM/DD')}]</span>
          {entry.ja_translated.title}{" "}
        </a>
        {isJp || (
          <>
            <a href={entry.url} title="元の言語で表示する">
              <span className="material-icons open-in-new">open_in_new</span>
            </a>
          </>
        )}
      </div>
      <Snippet text={snippet} />
      <style jsx>{`
        .icon {
          display: inline-block;
          width: 16px;
        }
        .date {
          margin: 0 5px;
        }
        .material-icons {
          font-size: 1em;
          vertical-align: middle;
        }
        .open-in-new {
          color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </li>
  );
};

const Snippet = ({ text }) => <div className="mb-2 small text-secondary">{text}</div>;

export default Page;
