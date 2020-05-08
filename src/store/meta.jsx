import React, { createContext, useReducer } from 'react'

import * as api from '../api'

const metaInitialState = {
  fetching: false,
  loaded: false,
  data: {}
}

export const MetaContext = createContext([metaInitialState, () => {}])

const actions = {
  REQUEST_META: 'REQUEST_META',
  RECEIVE_META: 'RECEIVE_META'
}

// reducer is only synchronous
function reducer(state, action) {
  switch (action.type) {
    case actions.REQUEST_META:
      console.log('request meta')
      return {
        ...state,
        fetching: true
      }

    case actions.RECEIVE_META:
      return {
        fetching: false,
        loaded: true,
        data: action.payload
      }
  }
}

const asyncActions = {
  FETCH_META: 'FETCH_META'
}

export function fetchMeta() {
  return {
    type: asyncActions.FETCH_META
  }
}

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, metaInitialState)
  async function asyncDispatch(action) {
    switch (action.type) {
      case asyncActions.FETCH_META:
        dispatch({ type: actions.REQUEST_META })
        const meta = await api.fetchMeta()
        dispatch({ type: actions.RECEIVE_META, payload: meta })
        return
    }
  }
  return (
    <MetaContext.Provider value={[state, asyncDispatch]}>
      {children}
    </MetaContext.Provider>
  )
}
