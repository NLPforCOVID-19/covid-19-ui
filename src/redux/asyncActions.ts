import { createAsyncThunk, createSelector } from '@reduxjs/toolkit'

import * as API from '../api'

import { RootState } from '@src/redux/index'
import { Entry, Lang, RegionId, Topic } from '@src/types'
import { ViewMode } from '@src/redux/ui'

const entriesNumSelector = createSelector(
  (state: RootState, { region, topic }: { region: RegionId; topic: Topic }) =>
    state.entriesByRegionTopic[region][topic].entries,
  (entries) => entries.length
)

export const createNewsViewHash = createSelector(
  [
    (state: RootState) => state.ui.viewMode,
    (state: RootState) => state.regionsTopics.activeRegion,
    (state: RootState) => state.regionsTopics.activeTopic
  ],
  (mode, region, topic) => {
    switch (mode) {
      case 'region':
        return `#r/${region}`
      case 'topic':
        return `#t/${topic}`
      default:
        return ''
    }
  }
)

const parseHashToViewState = (hash: string): { mode: ViewMode; target: string } => {
  // #r/jp -> ['r', 'jp']
  const [mode, target] = decodeURIComponent(hash).slice(1).split('/')
  if (!(mode && target)) {
    return { mode: 'neutral', target: '' }
  }
  switch (mode) {
    case 'r':
      return { mode: 'region', target }
    case 't':
      return { mode: 'topic', target }
  }
}

export const fetchMetaAndFirstEntries = createAsyncThunk(
  'fetchMetaAndFirstEntries',
  async ({ lang, hash }: { lang: Lang; hash: string }) => {
    const { mode, target } = parseHashToViewState(hash)
    const { regions, topics } = await API.fetchMeta(lang)
    const entriesByRegion = await API.fetchEntriesAll(lang)
    return {
      regions,
      topics,
      entriesByRegion,
      mode: mode === 'neutral' ? 'topic' : mode,
      activeTopic: mode === 'topic' ? target : topics[0],
      activeRegion: mode === 'region' ? target : regions[0].id
    }
  }
)

export const loadMore = createAsyncThunk<Entry[], { region: RegionId; topic: Topic; lang: Lang }, { state: RootState }>(
  'loadMore',
  async ({ region, topic, lang }, ThunkAPI) => {
    const offset = entriesNumSelector(ThunkAPI.getState(), { region, topic })
    return API.fetchNewsByClassAndCountry(topic, region, offset, 20, lang)
  }
)
