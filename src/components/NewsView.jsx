import React, { useState, useEffect, useContext, useRef } from 'react'
import Container from 'react-bootstrap/Container'

import Loading from './Loading'
import { StoreContext } from '../store'
import { RegionView } from './RegionView'
import { TopicView } from './TopicView'

const NewsView = ({ showEditButton }) => {
  const wrapRef = useRef(null)
  const [state] = useContext(StoreContext)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  function handleClickTopic(topic) {
    location.hash = `#t/${topic}`
  }

  function handleClickCountry(country) {
    location.hash = `#r/${country}`
  }

  function handleHashChange() {
    if (!state.metaLoaded) {
      return
    }
    const { topics, countries } = state.meta
    const slugs = decodeURIComponent(location.hash).slice(1).split('/')
    switch (slugs[0]) {
      case 'r': {
        if (!countries.find((c) => c.country === slugs[1])) {
          break
        }
        setSelectedTopic(null)
        setSelectedCountry(slugs[1])
        wrapRef.current && wrapRef.current.scrollIntoView(true)
        break
      }
      case 't': {
        if (!topics.includes(slugs[1])) {
          break
        }
        setSelectedCountry(null)
        setSelectedTopic(slugs[1])
        wrapRef.current && wrapRef.current.scrollIntoView(true)
        break
      }
    }
  }

  // set initial selected topic
  useEffect(() => {
    if (state.metaLoaded) {
      setSelectedTopic(state.meta.topics[0])
      handleHashChange()
    }
  }, [state.metaLoaded])

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [state.metaLoaded])

  if (!state.metaLoaded || (!selectedTopic && !selectedCountry)) {
    return (
      <Container className="mt-3">
        <div className="text-center wrap">
          <Loading />
        </div>
        <style jsx>{`
          .wrap {
            height: 100vh;
          }
        `}</style>
      </Container>
    )
  }

  return (
    <div ref={wrapRef}>
      {selectedCountry && (
        <RegionView
          selectedCountry={selectedCountry}
          onClickRegion={handleClickCountry}
          onClickTopic={handleClickTopic}
          showEditButton={showEditButton}
        />
      )}
      {selectedTopic && (
        <TopicView
          selectedTopic={selectedTopic}
          onClickTopic={handleClickTopic}
          onClickRegion={handleClickCountry}
          showEditButton={showEditButton}
        />
      )}
    </div>
  )
}

export default NewsView
