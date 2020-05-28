import React, { useState, useEffect, useMemo, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import NewsCard from './NewsCard';
import Tabs from './Tabs';
import Loading from './Loading';
import IndicatorLegends from './IndicatorLegends';
import { StoreContext } from '../store';
import Stats from './Stats';

const NewsView = () => {
  const [state] = useContext(StoreContext);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  function handleClickTopic(topic) {
    setSelectedCountry(null)
    setSelectedTopic(topic)
  }

  function handleClickCountry(country) {
    setSelectedTopic(null)
    setSelectedCountry(country)
  }

  // set initial selected topic
  useEffect(() => {
    if (state.metaLoaded) {
      setSelectedTopic(state.meta.topics[0])
    }
  }, [state.metaLoaded])

  if (!state.metaLoaded || (!selectedTopic && !selectedCountry)) {
    return (
      <Container className="mt-3 text-center">
        <Loading />
      </Container>
    )
  };

  const { topics, countries } = state.meta

  if (selectedCountry) {
    const selectedCountryName = countries.find(c => c.country === selectedCountry).name.ja
    const countryNames = countries.map(c => c.name.ja)
    return (
      <Container className="mt-3" id="news-view">
        <Tabs active={selectedCountryName} choices={countryNames} onChange={(idx) => handleClickCountry(countries[idx].country)} />
        <IndicatorLegends />
        <Container>
          <Row>
            {topics.map((t) => (
              <NewsCard
                key={t}
                title={t}
                countryId={selectedCountry}
                topic={t}
                onClickTitle={() => handleClickTopic(t)}
              />
            ))}
          </Row>
        </Container>
      </Container>
    )
  }

  return (
    <Container className="mt-3" id="news-view">
      <Tabs active={selectedTopic} choices={topics} onChange={(idx) => handleClickTopic(topics[idx])} />
      <IndicatorLegends />
      <Container>
        <Row>
          {countries.map((c) => (
            <NewsCard
              key={c.country}
              title={c.name.ja}
              countryId={c.country}
              topic={selectedTopic}
              onClickTitle={() => handleClickCountry(c.country)}
            >
              <div className="text-muted small"><Stats stats={c.stats} /></div>
            </NewsCard>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default NewsView;
