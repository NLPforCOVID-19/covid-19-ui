import React, { useState, useEffect, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { fetchNewsByClass, fetchNewsByClassAndCountry, fetchMeta } from '../api';
import Country from './Country';
import TopicList from './TopicList';
import Loading from './Loading';

const CountryList = () => {
  const [topics, setTopics] = useState([]);
  const [countries, setCountries] = useState([]);
  const [news, setNews] = useState({});
  // const [stats, setStats] = useState({});
  const [selectedTopic, setSelectedTopic] = useState('');
  
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  // { [country]: { loading: boolean, noMore: { [topic]: boolean } } }
  const [countriesFetchState, setCountriesFetchedState] = useState({});

  // computed value: filter news by currently selected class.
  const filteredNews = useMemo(() => {
    return filterNewsByClass(selectedTopic);
  }, [news, selectedTopic]);

  function setLoading(country, bool) {
    setCountriesFetchedState(prev => ({
      ...prev,
      [country]: {
        ...prev[country],
        loading: bool
      }
    }))
  }

  function setNoMoreNews(country, topic) {
    setCountriesFetchedState(prev => {
      let newCountryState = {
        loading: false,
        noMore: {}
      }
      if (prev[country]) {
        newCountryState = {...prev[country]}
      }
      newCountryState.noMore = {
        ...newCountryState.noMore,
        [topic]: true
      }
      return {
        ...prev,
        [country]: newCountryState
      }
    })
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

  function filterNewsByClass(topic) {
    let result = {};
    for (const country of Object.keys(news)) {
      result[country] = news[country].filter((entry) => {
        return !!entry.topics.find(t => t.name === topic)
      });
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
    const metaRes = await fetchMeta();
    setCountries(metaRes.countries);
    for (const c of metaRes.countries) {
      setLoading(c.country, true);
    }
    setTopics(metaRes.topics);
    setSelectedTopic(metaRes.topics[0]);
    setIsFetchingMeta(false);
    const firstClassNews = await fetchNewsByClass(metaRes.topics[0], 20);
    for (const c of metaRes.countries) {
      const country = c.country
      if (!firstClassNews[country] || firstClassNews[country].length < 20) {
        setNoMoreNews(country, metaRes.topics[0]);
      }
    }
    setNews(firstClassNews);
    const topicsNum = metaRes.topics.length;
    // fetch other topic news
    const otherClassNews = await Promise.all(metaRes.topics.slice(1, topicsNum).map(c => fetchNewsByClass(c, 20)));
    otherClassNews.forEach((e, i) => {
      for (const c of metaRes.countries) {
        const country = c.country;
        if (!e[country] || e[country].length < 20) {
          setNoMoreNews(country, metaRes.topics[i + 1]);
        }
      }
      setNewsWithSortUniq(e);
    })
    setAllCountriesLoading(false);
  }

  async function loadMore(c) {
    if (countriesFetchState[c]?.loading || countriesFetchState[c]?.noMore?.[selectedTopic]) {
      return;
    }
    setLoading(c, true);
    const offset = filteredNews[c] ? filteredNews[c].length : 0;
    const newEntries = await fetchNewsByClassAndCountry(selectedTopic, c, offset, 10);
    if (newEntries.length < 10) {
      setNoMoreNews(c, selectedTopic)
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
      <TopicList selectedTopic={selectedTopic} topics={topics} changeTopic={setSelectedTopic} />
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
                stats={c.stats}
                title={c.name.ja}
                url={c.representativeSiteUrl}
                loading={countriesFetchState[c.country]?.loading}
                entries={filteredNews[c.country] || []}
                topic={selectedTopic}
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
