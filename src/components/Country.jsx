import React from 'react';
import Page from './Page';
import Loading from './Loading'

export default ({ title, entries, topic, url, loading, stats, last_update }) => {
  return (
    <div className="col-xl-4 col-lg-6 p-1">
      <div className="p-2 border rounded">
        <div className="inner">
          <h5 className="m-0">
            {title}
            &nbsp;
            <a href={url} title="公的機関のウェブサイトを確認する">
              <span className="material-icons">open_in_new</span>
            </a>
          </h5>
          <div className="text-muted small">
            感染者: {stats.confirmation_total}{' '}(+{stats.confirmation_today})
            {' '}/
            死亡者: {stats.death_total}{' '}(+{stats.death_today})
          </div>
          {!loading && entries.length === 0 && <div>情報はありません。</div>}
          <div className="scroll mt-1 mb-1">
            <ul>
              {entries.map((entry, i) => (
                <Page key={i} entry={entry} topic={topic} />
              ))}
            </ul>
            {loading && (
              <div className="loading"><Loading /></div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .material-icons {
          color: rgba(0, 0, 0, 0.5);
          display: inline-flex;
          vertical-align: middle;
          font-size: 1em;
        }
        .inner {
          height: 360px;
          display: flex;
          flex-flow: column nowrap;
        }
        .header {
          display: flex;
        }
        .scroll {
          display: flex;
          flex-flow: column nowrap;
          margin: 10px 0;
          overflow-y: auto;
        }
        .scroll > ul {
          padding-left: 20px;
        }
        .loading {
          margin: auto;
        }
      `}</style>
    </div>
  );
};
