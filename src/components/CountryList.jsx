import React, { useState, useEffect, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { fetchNewsByClass, fetchNewsByClassAndCountry, fetchMeta, fetchStats } from '../api';
import Country from './Country';
import TopicList from './TopicList';
import Loading from './Loading';

const NEWS_INITIAL = 30;
const LOAD_MORE_THRESHOLD = 15;

const CountryList = () => {
  const [classes, setClasses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [news, setNews] = useState({});
  const [stats, setStats] = useState({});
  const [lastUpdate, setLastUpdate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [isFetchingNews, setIsFetchingNews] = useState(false);

  const [initialLoadEnded, setInitialLoadEnded] = useState(false);

  // computed value: filter news by currently selected class.
  const filteredNews = useMemo(() => {
    let result = {};
    for (const c of countries) {
      const country = c.country
      result[country] = (news[country] || []).filter((entry) => entry.classes[selectedClass] === 1);
    }
    return result;
  }, [news, selectedClass]);

  function fetchCountriesAndStats() {
    setIsFetchingMeta(true);
    return new Promise((resolve) => {
      Promise.all([fetchMeta(), fetchStats()])
      .then((values) => {
        const [meta, stats] = values;
        setCountries(meta.countries);
        setClasses(meta.classes);
        setStats(stats.stats);
        setLastUpdate(stats.last_update);
        setSelectedClass(meta.classes[0])
        resolve(meta.classes[0]);
      })
      .finally(() => {
        setIsFetchingMeta(false);
      });
    })
  }

  // fetch news of initial class passed by
  // fetchCountriesAndStats
  function fetchInitialNews(initialClass) {
    setIsFetchingNews(true);
    fetchNewsByClass(initialClass, NEWS_INITIAL)
      .then((news) => {
        setNews(news);
      })
      .finally(() => {
        setIsFetchingNews(false);
        setInitialLoadEnded(true);
    });
  }

  // Run only ones
  useEffect(() => {
    fetchCountriesAndStats()
      .then(initialClass => {
        fetchInitialNews(initialClass);
      })
  }, []);

  function sortEntriesByTimestamp(entries) {
    return entries.sort((a, b) => {
      return Date.parse(b.orig.timestamp) - Date.parse(a.orig.timestamp);
    });
  }

  // When change class tab, request more news
  // if the number of filtered news is fewer than 10.
  useEffect(() => {
    if(!initialLoadEnded) {
      return;
    }
    setIsFetchingNews(true)
    const promises = countries
      .filter((c) => filteredNews[c.country].length < LOAD_MORE_THRESHOLD)
      .map((c) => {
        const country = c.country;
        const len = filteredNews[country].length;
        return fetchNewsByClassAndCountry(selectedClass, country, len, LOAD_MORE_THRESHOLD - len);
    });

    Promise.allSettled(promises)
      .then(results => {
        let mergedNews = {}

        for (const res of results) {
          if (res.status === 'rejected') {
            continue;
          }
          const newEntries = res.value;
          if (newEntries.length === 0) {
            continue;
          }
          const country = newEntries[0].country;
          const sorted = sortEntriesByTimestamp([...news[country], ...newEntries]);
          mergedNews[country] = sorted;
        }

        setNews({
          ...news,
          ...mergedNews
        });
        setIsFetchingNews(false);
      })


  }, [selectedClass]);

  return (
    <Container className="mt-3">
      <TopicList selectedTopic={selectedClass} topics={classes} changeTopic={setSelectedClass} />
      {isFetchingMeta ? (
        <div className="text-center">
          <Loading />
        </div>
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
                loading={isFetchingNews}
                entries={filteredNews[c.country] || []}
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
