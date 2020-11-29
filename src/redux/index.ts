import { combineReducers, configureStore } from '@reduxjs/toolkit'

import entriesReducer from './entries'
import regionsTopicsReducer from './regionsTopics'
import entriesByRegionTopicReducer from './entriesByRegionTopic'
import uiReducer from './ui'

const rootReducer = combineReducers({
  entries: entriesReducer,
  regionsTopics: regionsTopicsReducer,
  entriesByRegionTopic: entriesByRegionTopicReducer,
  ui: uiReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer
})
