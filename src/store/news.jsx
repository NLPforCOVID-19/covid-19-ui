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
  newsStates: {}
}

export const NewsContext = createContext([initialState, () => {}])

const actions = {
  // REQUEST_META: 'REQUEST_META',
  RECEIVE_META: 'RECEIVE_META',
  REQUEST_NEWS: 'REQUEST_NEWS',
  RECEIVE_NEWS: 'RECEIVE_NEWS',
  SET_NOMORE: 'SET_NOMORE'
}

// reducer is only synchronous
function reducer(state, action) {
  switch (action.type) {
    // case actions.REQUEST_META:
    //   return state

    case actions.RECEIVE_META:
      const { countries, topics } = action.payload
      let news = {}
      let newsState = {}
      for (const topic of topics) {
        news[topic] = {}
        newsState[topic] = {}
        for (const c of countries) {
          news[topic][c.country] = []
          news[topic][c.country] = {
            loading: false,
            noMore: false
          }
        }
      }
      return {
        ...state,
        metaLoaded: true,
        meta: action.payload,
        news: news,
        newsState: newsState
      }

    case actions.REQUEST_NEWS:
      return {
        ...state,
        newsState: {
          ...state.newsState,
          [country]: {
            ...state.newsState[country],
            [topic]: {
              loading: true,
              noMore: false
            }
          }
        }
      }

    case actions.RECEIVE_NEWS:
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
        newsState: {
          ...state.newsState,
          [topic]: {
            ...state.newsState[topic],
            [country]: {
              loading: false,
              noMore: isNoMore
            }
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

const asyncActions = {
  FETCH_META: 'FETCH_META',
  FETCH_NEWS_BY_TOPIC: 'FETCH_NEWS_BY_TOPIC',
  LOAD_MORE_NEWS: 'LOAD_MORE_NEWS'
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

export function loadMore(country) {
  return {
    type: asyncActions.LOAD_MORE_NEWS,
    target: country
  }
}

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  async function asyncDispatch(action) {
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
        if (Object.keys(state.news[topic]).length > 0) {
          console.log('already loaded some news')
          return
        }
        const limit = 20
        for (const country of state.meta.countries) {
          dispatch(requestNews(topic, country))
        }
        const res = await api.fetchNewsByClass(topic, limit)
        for (const c of state.meta.countries) {
          if (!res[c]) {
            dispatch(receiveNews(topic, c, [], true))
            continue
          }
          dispatch(receiveNews(topic, c, res[c], res[c].length < limit))
        }
        break
      }
      
      case asyncActions.LOAD_MORE_NEWS: {
        const { topic, country } = action.target
        const { noMore, loading } = state.newsState[topic][country]
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
    <NewsContext.Provider value={[state, asyncDispatch]}>
      {children}
    </NewsContext.Provider>
  )
}
