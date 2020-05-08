import React, { useState, useEffect, useMemo, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Country from './Country';
import TopicList from './TopicList';
import Loading from './Loading';
import IndicatorLegends from './IndicatorLegends';
import { StoreContext } from '../store';

const CountryList = () => {
  const [state] = useContext(StoreContext);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // set initial selected topic
  useEffect(() => {
    if (state.metaLoaded) {
      setSelectedTopic(state.meta.topics[0])
    }
  }, [state.metaLoaded])

  if (!state.metaLoaded || !selectedTopic) {
    return (
      <Container className="mt-3 text-center">
        <Loading />
      </Container>
    )
  };

  const { topics, countries } = state.meta

  return (
    <Container className="mt-3">
      <TopicList selectedTopic={selectedTopic} topics={topics} changeTopic={setSelectedTopic} />
      <IndicatorLegends />
      <Container>
        <Row>
          {countries.map((c) => (
            <Country
              key={c.country}
              countryId={c.country}
              topic={selectedTopic}
            />
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default CountryList;
