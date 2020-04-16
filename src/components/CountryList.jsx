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

  const [allFetchedFlags, setAllFetchedFlags] = useState({});

  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [isFetchingNews, setIsFetchingNews] = useState(false);

  const [initialLoadEnded, setInitialLoadEnded] = useState(false);

  // computed value: filter news by currently selected class.
  const filteredNews = useMemo(() => {
    let result = {};
    for (const country of Object.keys(news)) {
      result[country] = news[country].filter((entry) => entry.classes[selectedClass] === 1);
    }
    return result;
  }, [news, selectedClass]);

  function fetchCountriesAndStats() {
    setIsFetchingMeta(true);
    return new Promise((resolve) => {
      Promise.all([fetchMeta(), fetchStats(), fetchNewsByClass('all')])
      .then((values) => {
        const [meta, stats, initialNews] = values;
        setCountries(meta.countries);
        setClasses(meta.classes);
        setStats(stats.stats);
        setLastUpdate(stats.last_update);
        setSelectedClass(meta.classes[0]);
        setNews(initialNews);
        resolve(meta.classes);
      })
      .finally(() => {
        setIsFetchingMeta(false);
        setInitialLoadEnded(true)
      });
    })
  }

  async function chainNews() {
    setIsFetchingNews(true)
    const topics = await fetchCountriesAndStats()
    const promises = topics.map(t => fetchNewsByClass(t))
    Promise.all(promises)
      .then(results => {
        let merged = {...news}
        for(const result of results) {
          for (const key of Object.keys(result)) {
            const concatted = filterUniqueNews(merged[key] || [], result[key])
            const sorted = sortEntriesByTimestamp(concatted)
            merged[key] = sorted
          }
        }
        setNews(merged)
        setIsFetchingNews(false)
      })
  }

  function filterUniqueNews(news1, news2) {
    let result = [...news1]
    for (const news of news2) {
      if (news1.filter(n => n.url === news.url).length > 0) {
        continue
      }
      result.push(news);
    }
    return result
  }

  // Run only ones
  useEffect(() => {
    chainNews()
  }, []);

  function sortEntriesByTimestamp(entries) {
    return entries.sort((a, b) => {
      return Date.parse(b.orig.timestamp) - Date.parse(a.orig.timestamp);
    });
  }

  async function loadMore(c) {
    if (!initialLoadEnded || isFetchingNews || allFetchedFlags[c]?.[selectedClass]) {
      return;
    }
    setIsFetchingNews(true)
    const offset = filteredNews[c].length;
    const newEntries = await fetchNewsByClassAndCountry(selectedClass, c, offset, 10);
    if (newEntries.length < 10) {
      setAllFetchedFlags({
        ...allFetchedFlags,
        [c]: {
          ...allFetchedFlags[c],
          [selectedClass]: true
        }
      })
    }

    setNews({...news, [c]: [...news[c], ...newEntries]})
    setIsFetchingNews(false);
  }

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
                title={c.name.ja}
                url={c.representativeSiteUrl}
                loading={isFetchingNews}
                entries={filteredNews[c.country] || []}
                topic={selectedClass}
                loadMore={() => loadMore(c.country)}
              />
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default CountryList;
