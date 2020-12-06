import { createSlice } from '@reduxjs/toolkit'

import { Url, RegionId, Topic } from '@src/types'

import { fetchMetaAndFirstEntries, loadMore } from './asyncActions'

interface StateForEachRegionTopic {
  entries: Url[]
  noMore: boolean
  loading: boolean
}

type State = Record<RegionId, Record<Topic, StateForEachRegionTopic>>

const createInitialStateForEachRegionTopic = (prev: State, region: RegionId, topic: Topic) => {
  if (!prev[region]) {
    prev[region] = {}
  }
  if (!prev[region][topic]) {
    prev[region][topic] = {
      entries: [],
      noMore: false,
      loading: false
    }
  }
}

const initialState: State = {}

const entriesByRegionTopicSlice = createSlice({
  name: 'entriesByRegionTopic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMore.pending, (state, action) => {
        const { region, topic } = action.meta.arg
        createInitialStateForEachRegionTopic(state, region, topic)
        state[region][topic].loading = true
      })
      .addCase(loadMore.fulfilled, (state, action) => {
        const { region, topic } = action.meta.arg
        const newEntries = action.payload
        state[region][topic].loading = false
        if (newEntries.length === 0) {
          state[region][topic].noMore = true
        }
        state[region][topic].entries.push(...newEntries.map((e) => e.url))
      })
      .addCase(fetchMetaAndFirstEntries.fulfilled, (state, action) => {
        const { regions, topics, entriesByRegion } = action.payload
        for (const region of regions) {
          state[region.id] = {}
          for (const topic of topics) {
            state[region.id][topic] = {
              entries: [],
              noMore: false,
              loading: false
            }
          }
          for (const entry of entriesByRegion[region.id]) {
            const topics = Object.keys(entry.snippets)
            for (const topic of topics) {
              state[region.id][topic].entries.push(entry.url)
            }
          }
        }
      })
  }
})

export default entriesByRegionTopicSlice.reducer
