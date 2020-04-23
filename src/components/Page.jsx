import React from 'react';
import dayjs from 'dayjs';

import * as Icons from './Icons';

function makeTranslatedUrl(url) {
  const target_lang = 'ja';
  return `https://translate.google.com/translate?tl=${target_lang}&u=${url}`;
}

const Page = ({ entry, topic }) => {
  const isJp = entry.country === 'jp';
  const topicData = entry.topics.find(t => t.name === topic);
  const snippet = topicData ? topicData.snippet : '';
  const isVerified = entry.is_useful !== -1;
  const isAboutFalseRumor = entry.is_about_false_rumor === 1;
  const isUseful = entry.is_useful === 1 && isAboutFalseRumor !== 1;
  return (
    <li>
      <div>
        <a
          href={isJp ? entry.url : makeTranslatedUrl(entry.url)}
          target="_blank"
          rel="noreferrer noopener"
          className="text-info"
        >
          <Icons.Verified active={isVerified} />
          <span className="small date">[{dayjs(entry.orig.timestamp).format('MM/DD')}]</span>
          {entry.ja_translated.title}{" "}
          {isAboutFalseRumor && <Icons.Rumor />}
          {isUseful && <Icons.Useful />}{" "}
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
