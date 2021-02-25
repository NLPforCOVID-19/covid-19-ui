import { combineReducers, configureStore } from '@reduxjs/toolkit'

import entriesReducer from './entries'
import twitterEntriesReducer from './twitterEntries'
import regionsTopicsReducer from './regionsTopics'
import entriesByRegionTopicReducer from './entriesByRegionTopic'
import twitterEntriesByRegionTopicReducer from './twitterEntriesByRegionTopic'
import uiReducer from './ui'
import searchReducer from './search'

const rootReducer = combineReducers({
  entries: entriesReducer,
  twitterEntries: twitterEntriesReducer,
  regionsTopics: regionsTopicsReducer,
  entriesByRegionTopic: entriesByRegionTopicReducer,
  twitterEntriesByRegionTopic: twitterEntriesByRegionTopicReducer,
  ui: uiReducer,
  search: searchReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer
})
