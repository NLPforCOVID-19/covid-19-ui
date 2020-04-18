import React, { useState, useEffect, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { fetchNewsByClass, fetchNewsByClassAndCountry, fetchMeta, fetchStats } from '../api';
import Country from './Country';
import TopicList from './TopicList';
import Loading from './Loading';

const CountryList = () => {
  const [classes, setClasses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [news, setNews] = useState({});
  const [stats, setStats] = useState({});
  const [selectedClass, setSelectedClass] = useState('');

  const [allFetchedFlags, setAllFetchedFlags] = useState({});

  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [isFetchingNews, setIsFetchingNews] = useState(false);

  const [initialLoadEnded, setInitialLoadEnded] = useState(false);

  // computed value: filter news by currently selected class.
  const filteredNews = useMemo(() => {
    return filterNewsByClass(selectedClass);
  }, [news, selectedClass]);

  function filterNewsByClass(class_) {
    let result = {};
    for (const country of Object.keys(news)) {
      result[country] = news[country].filter((entry) => entry.classes[class_] === 1);
    }
    return result;
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

  function sortEntriesByTimestamp(entries) {
    return entries.sort((a, b) => {
      return Date.parse(b.orig.timestamp) - Date.parse(a.orig.timestamp);
    });
  }

  function setNewsWithSortUniq(newEntries) {
    setNews(prevNews => {
      let merged = {};
      for (const country of Object.keys(newEntries)) {
        const uniq = filterUniqueNews(prevNews[country] || [], newEntries[country]);
        const sorted = sortEntriesByTimestamp(uniq);
        merged[country] = sorted;
      }
      return merged;
    });
  }

  async function initialLoad() {
    setIsFetchingMeta(true);
    setIsFetchingNews(true);
    const [metaRes, statsRes] = await Promise.all([fetchMeta(), fetchStats()]);
    setCountries(metaRes.countries);
    setClasses(metaRes.classes);
    setStats(statsRes.stats);
    setSelectedClass(metaRes.classes[0]);
    setIsFetchingMeta(false);
    const firstClassNews = await fetchNewsByClass(metaRes.classes[0]);
    console.log('loaded first topic news');
    setNews(firstClassNews);
    const classesLen = metaRes.classes.length;
    const otherClassNews = await Promise.all(metaRes.classes.slice(1, classesLen).map(c => fetchNewsByClass(c)));
    otherClassNews.forEach((e, i) => {
      console.log('otherClassNews', metaRes.classes[i + 1]);
      setNewsWithSortUniq(e);
    })
    setIsFetchingNews(false);
    setInitialLoadEnded(true);
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

    // Run only ones
    useEffect(() => {
      initialLoad();
    }, []);  

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
