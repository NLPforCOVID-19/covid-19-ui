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
  
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  // { country: { loading: boolean, noMore: { class: boolean } } }
  const [countriesFetchState, setCountriesFetchedState] = useState({});

  // computed value: filter news by currently selected class.
  const filteredNews = useMemo(() => {
    return filterNewsByClass(selectedClass);
  }, [news, selectedClass]);

  function setLoading(country, bool) {
    setCountriesFetchedState(prev => ({
      ...prev,
      [country]: {
        ...prev[country],
        loading: bool
      }
    }))
  }

  function setAllCountriesLoading(bool) {
    setCountriesFetchedState(prev => {
      let newState = {...prev};
      for (const country of Object.keys(prev)) {
        newState[country] = {
          ...newState[country],
          loading: bool
        }
      }
      return newState;
    })
  }

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
      const keys = [...Object.keys(prevNews), ...Object.keys(newEntries)];
      for (const country of keys) {
        const uniq = filterUniqueNews(prevNews[country] || [], newEntries[country] || []);
        const sorted = sortEntriesByTimestamp(uniq);
        merged[country] = sorted;
      }
      return merged;
    });
  }

  async function initialLoad() {
    setIsFetchingMeta(true);
    const [metaRes, statsRes] = await Promise.all([fetchMeta(), fetchStats()]);
    setCountries(metaRes.countries);
    for (const c of metaRes.countries) {
      setLoading(c.country, true);
    }
    setClasses(metaRes.classes);
    setStats(statsRes.stats);
    setSelectedClass(metaRes.classes[0]);
    setIsFetchingMeta(false);
    const firstClassNews = await fetchNewsByClass(metaRes.classes[0]);
    setNews(firstClassNews);
    const classesLen = metaRes.classes.length;
    // fetch other class news
    for (const class_ of metaRes.classes.slice(1, classesLen)) {
      fetchNewsByClass(class_)
        .then(res => {
          setNewsWithSortUniq(res);
        })
    }
    const otherClassNews = await Promise.all(metaRes.classes.slice(1, classesLen).map(c => fetchNewsByClass(c)));
    otherClassNews.forEach((e, i) => {
      setNewsWithSortUniq(e);
    })
    setAllCountriesLoading(false);
  }

  async function loadMore(c) {
    if (countriesFetchState[c]?.loading || countriesFetchState[c]?.[selectedClass]) {
      return;
    }
    setLoading(c, true);
    const offset = filteredNews[c].length;
    const newEntries = await fetchNewsByClassAndCountry(selectedClass, c, offset, 10);
    if (newEntries.length < 10) {
      setCountriesFetchedState({
        ...countriesFetchState,
        [c]: {
          ...countriesFetchState[c],
          [selectedClass]: true
        }
      })
    }
    setNewsWithSortUniq({[c]: newEntries});
    setLoading(c, false);
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
                loading={countriesFetchState[c.country]?.loading}
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
