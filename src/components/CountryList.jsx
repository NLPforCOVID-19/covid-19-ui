import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { fetchNewsByClass, fetchMeta, fetchStats } from '../api';
import Country from './Country';
import TopicList from './TopicList';
import Spinner from 'react-bootstrap/Spinner';
import Loading from './Loading';

const CountryList = () => {
  const ALL = 'all';
  const [classes, setClasses] = useState([]);
  const [countries, setCoutries] = useState([]);
  const [news, setNews] = useState({});
  const [stats, setStats] = useState({});
  const [lastUpdate, setLastUpdate] = useState({});
  const [isNewsFetched, setNewsFetched] = useState(false);
  const [isMetaFetched, setMetaFetched] = useState(false);
  const [selectedClass, setSelectedClass] = useState(ALL);

  useEffect(() => {
    Promise.all([fetchMeta(), fetchNewsByClass(ALL), fetchStats()]).then((responses) => {
      const [meta, news, stats] = responses;
      setClasses(meta.classes);
      setCoutries(meta.countries);
      setNews(news);
      setStats(stats.stats);
      setLastUpdate(stats.last_update);
      setMetaFetched(true);
      setNewsFetched(true);
    });
  }, []);

  useEffect(() => {
    if (!isNewsFetched) {
      return;
    }
    setNewsFetched(false);
    fetchNewsByClass(selectedClass).then((news) => {
      setNews(news);
      setNewsFetched(true);
    });
  }, [selectedClass]);

  return (
    <Container className="mt-3 p-3 border rounded">
      <h4 className="mb-3">各国の情報</h4>
      <TopicList selectedTopic={selectedClass} topics={classes} changeTopic={setSelectedClass} />
      {!isMetaFetched ? (
        <div className="text-center"><Loading /></div>
      ) : (
        <Container>
          <Row>
            {countries.map((c) => (
              <Country
                key={c.country}
                stats={stats[c.country]}
                last_update={lastUpdate}
                title={c.name.ja}
                url={c.representativeSiteUrl}
                loading={!isNewsFetched}
                entries={isNewsFetched && news[c.country] ? news[c.country] : []}
                topic={selectedClass}
              />
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default CountryList;
