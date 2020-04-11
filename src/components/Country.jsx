import React from 'react';
import Card from 'react-bootstrap/Card';
import Page from './Page';
import Loading from './Loading'

export default ({ title, entries, topic, url, loading, stats, last_update }) => {
  return (
    <div className="col-xl-4 col-lg-6 mb-3">
      <Card>
        <Card.Body>
          <h5 className="card-title">
            {title}
            &nbsp;
            <a href={url} title="公的機関のウェブサイトを確認する">
              <span className="material-icons">open_in_new</span>
            </a>
          </h5>
          <h6>{ last_update }時点での統計</h6>
          <ul>
            <li>累計感染者数: {stats.confirmation_total} (+{stats.confirmation_today}人)</li>
            <li>累計死亡者数: {stats.death_total} (+{stats.death_today}人)</li>
          </ul>
          <h6>関連情報</h6>
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
        </Card.Body>
      </Card>
      <style jsx>{`
        .material-icons {
          color: rgba(0, 0, 0, 0.5);
          display: inline-flex;
          vertical-align: middle;
          font-size: 1em;
        }
        .header {
          display: flex;
        }
        .card-title {
          flex: 1 1 auto;
        }
        .scroll {
          display: flex;
          flex-flow: column nowrap;
          margin: 10px 0;
          height: 300px;
          overflow-y: auto;
        }
        .loading {
          margin: auto;
        }
      `}</style>
    </div>
  );
};
