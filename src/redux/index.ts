import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import entriesReducer from './entries'
import regionsReducer from './regions'
import entriesByRegionTopicReducer from './entriesByRegionTopic'

export const store = configureStore({
  reducer: combineReducers({
    entries: entriesReducer,
    regions: regionsReducer,
    entriesByRegionTopic: entriesByRegionTopicReducer
  })
})
