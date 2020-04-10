import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { fetchNewsByClass, fetchMeta, fetchStats } from '../api';
import Country from './Country';
import TopicList from './TopicList';
import Spinner from 'react-bootstrap/Spinner';

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
      console.log(responses);
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
        <Spinner animation="border" role="status"  variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
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
