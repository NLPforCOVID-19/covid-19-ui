import React, { createContext, useReducer } from 'react'

import * as api from '../api'

// interface Country {
//   country: string
//   language: string
//   name: {
//     ja: string
//   }
//   representiveSiteUrl: string
//   stats: {
//     confirmation_today: string
//     ...
//   }
// }

// interface News {}

// interface State {
//   metaLoaded: boolean
//   meta: {
//     countries: Country[]
//   }
//   news: {
//     [topic]: { [country]: News[] }
//   }
//   topicLoaded: { [topic]: boolean }
//   newsStates: {
//     [topic]: {
//       [country]: {
//         loading: boolean
//        noMore: boolean
//       }
//     }
//   }
// }

const initialState = {
  metaLoaded: false,
  meta: {},
  news: {},
  topicLoaded: {},
  newsStates: {}
}

export const StoreContext = createContext([initialState, () => {}])

const actions = {
  // REQUEST_META: 'REQUEST_META',
  RECEIVE_META: 'RECEIVE_META',
  REQUEST_NEWS: 'REQUEST_NEWS',
  RECEIVE_NEWS: 'RECEIVE_NEWS',
  SET_TOPIC_LOADED: 'SET_TOPIC_LOADED',
}

// reducer is only synchronous
function reducer(state, action) {
  switch (action.type) {
    // case actions.REQUEST_META:
    //   return state

    case actions.RECEIVE_META: {
      const { countries, topics } = action.payload
      let news = {}
      let newsStates = {}
      for (const topic of topics) {
        news[topic] = {}
        newsStates[topic] = {}
        for (const c of countries) {
          news[topic][c.country] = []
          newsStates[topic][c.country] = {
            loading: true,
            noMore: false
          }
        }
      }
      return {
        ...state,
        metaLoaded: true,
        meta: action.payload,
        news: news,
        newsStates: newsStates
      }
    }

    case actions.REQUEST_NEWS: {
      const { country, topic } = action.target
      return {
        ...state,
        newsStates: {
          ...state.newsStates,
          [topic]: {
            ...state.newsStates[topic],
            [country]: {
              loading: true,
              noMore: false
            }
          }
        }
      }
    }

    case actions.RECEIVE_NEWS: {
      const { country, topic, isNoMore } = action.target
      const prevEntries = state.news[topic][country]
      const nextEntries = [...prevEntries, ...action.payload]
      return {
        ...state,
        news: {
          ...state.news,
          [topic]: {
            ...state.news[topic],
            [country]: nextEntries
          }
        },
        newsStates: {
          ...state.newsStates,
          [topic]: {
            ...state.newsStates[topic],
            [country]: {
              loading: false,
              noMore: isNoMore
            }
          }
        }
      }
    }
    
    case actions.SET_TOPIC_LOADED: {
      const topic = action.target
      return {
        ...state,
        topicLoaded: {
          ...state.topicLoaded,
          [topic]: true
        }
      }
    }
  }
}
function receiveMeta(meta) {
  return {
    type: actions.RECEIVE_META,
    payload: meta
  }
}
function requestNews(topic, country) {
  return {
    type: actions.REQUEST_NEWS,
    target: { topic, country }
  }
}
function receiveNews(topic, country, news, isNoMore) {
  return {
    type: actions.RECEIVE_NEWS,
    target: { topic, country, isNoMore },
    payload: news
  }
}
function setTopicLoaded(topic) {
  return {
    type: actions.SET_TOPIC_LOADED,
    target: topic
  }
}

const asyncActions = {
  FETCH_META: 'FETCH_META',
  FETCH_NEWS_BY_TOPIC: 'FETCH_NEWS_BY_TOPIC',
  LOAD_MORE_NEWS: 'LOAD_MORE_NEWS',
  LOAD_ALL_TOPICS_NEWS: 'LOAD_ALL_TOPICS_NEWS'
}


export function fetchMeta() {
  return {
    type: asyncActions.FETCH_META
  }
}

export function fetchNewsByTopic(topic) {
  return {
    type: asyncActions.FETCH_NEWS_BY_TOPIC,
    target: topic
  }
}

export function loadMore(country, topic) {
  return {
    type: asyncActions.LOAD_MORE_NEWS,
    target: { country, topic }
  }
}

export function loadAllTopicsNews() {
  return {
    type: asyncActions.LOAD_ALL_TOPICS_NEWS
  }
}

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  async function asyncDispatch(action) {
    console.log('asyncdispatch', action)
    switch (action.type) {
      case asyncActions.FETCH_META: {
        // dispatch({ type: actions.REQUEST_META })
        const meta = await api.fetchMeta()
        dispatch(receiveMeta(meta))
        break
      }

      case asyncActions.FETCH_NEWS_BY_TOPIC: {
        const topic = action.target
        if (!state.metaLoaded) {
          console.log('meta not loaded')
          return
        }
        if (state.topicLoaded[topic]) {
          console.log('already loaded some news')
          return
        }
        const limit = 20
        for (const country of state.meta.countries) {
          const countryId = country.country
          dispatch(requestNews(topic, countryId))
        }
        const res = await api.fetchNewsByClass(topic, limit)
        for (const country of state.meta.countries) {
          const countryId = country.country
          if (!res[countryId]) {
            dispatch(receiveNews(topic, countryId, [], true))
            continue
          }
          dispatch(receiveNews(topic, countryId, res[countryId], res[countryId].length < limit))
          dispatch(setTopicLoaded(topic))
        }
        break
      }

      case asyncActions.LOAD_ALL_TOPICS_NEWS: {
        const topics = state.meta.topics.filter(t => !state.topicLoaded[t])
        await asyncDispatch(fetchNewsByTopic(topics[0]))
        for (const topic of topics.slice(1)) {
          asyncDispatch(fetchNewsByTopic(topic))
        }
        break
      }
      
      case asyncActions.LOAD_MORE_NEWS: {
        const { topic, country } = action.target
        const { noMore, loading } = state.newsStates[topic][country]
        if (noMore || loading) {
          console.log('abort load more', noMore, loading)
          return
        }
        const offset = state.news[topic][country].length
        const limit = 10
        dispatch(requestNews(topic, country))
        const res = await api.fetchNewsByClassAndCountry(topic, country, offset, limit)
        dispatch(receiveNews(topic, country, res, res.length < limit))
        break
      }
    }
  }
  return (
    <StoreContext.Provider value={[state, asyncDispatch]}>
      {children}
    </StoreContext.Provider>
  )
}
