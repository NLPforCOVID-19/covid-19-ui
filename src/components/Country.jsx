import React from 'react';
import Card from 'react-bootstrap/Card';
import Page from './Page';
import Loading from './Loading'

export default ({ title, entries, topic, url, loading, stats, last_update }) => {
  return (
    <div className="col-xl-4 col-lg-6 mb-3">
      <Card body>
        <div className="card-inner">
          <h5 className="card-title">
            {title}
            &nbsp;
            <a href={url} title="公的機関のウェブサイトを確認する">
              <span className="material-icons">open_in_new</span>
            </a>
          </h5>
          <div className="text-muted">
            感染者: {stats.confirmation_total}{' '}
            <span className="small">(+{stats.confirmation_today})</span>
            {' '}/ 死亡者: {stats.death_total}{' '}
            <span className="small">(+{stats.death_today})</span>
          </div>
          {!loading && entries.length === 0 && <div>情報はありません。</div>}
          <div className="scroll">
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
      </Card>
      <style jsx>{`
        .material-icons {
          color: rgba(0, 0, 0, 0.5);
          display: inline-flex;
          vertical-align: middle;
          font-size: 1em;
        }
        .card-inner {
          height: 360px;
          display: flex;
          flex-flow: column nowrap;
        }
        .header {
          display: flex;
        }
        .card-title {
          margin: 0;
          flex: 1 1 auto;
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
