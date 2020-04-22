import React from 'react';
import dayjs from 'dayjs';
import Badge from 'react-bootstrap/Badge'

function makeTranslatedUrl(url) {
  const target_lang = 'ja';
  return `https://translate.google.com/translate?tl=${target_lang}&u=${url}`;
}

const Page = ({ entry, topic }) => {
  const isJp = entry.country === 'jp';
  const topicData = entry.topics.find(t => t.name === topic);
  const snippet = topicData ? topicData.snippet : '';
  const isUseful = entry.is_useful === 1;
  const isAboutFalseRumor = entry.is_about_false_rumor === 1;
  return (
    <li>
      <div>
        <a
          href={isJp ? entry.url : makeTranslatedUrl(entry.url)}
          target="_blank"
          rel="noreferrer noopener"
          className="text-info"
        >
          {isUseful && <><Badge variant="warning">役に立つ</Badge>&nbsp;</>}
          {isAboutFalseRumor && <><Badge variant="primary">デマに関する情報</Badge>&nbsp;</>}
          {entry.ja_translated.title}&ensp;
          <span className="small">({dayjs(entry.orig.timestamp).format('YYYY-MM-DD')})</span>
        </a>
        {isJp || (
          <>
            &nbsp;
            <a href={entry.url} title="元の言語で表示する">
              <span className="material-icons">open_in_new</span>
            </a>
          </>
        )}
      </div>
      <Snippet text={snippet} />
      <style jsx>{`
        .material-icons {
          color: rgba(0, 0, 0, 0.5);
          font-size: 1em;
          vertical-align: middle;
          font-size: 1em;
        }
      `}</style>
    </li>
  );
};

const Snippet = ({ text }) => <div className="mb-2 small text-secondary">{text}</div>;

export default Page;
