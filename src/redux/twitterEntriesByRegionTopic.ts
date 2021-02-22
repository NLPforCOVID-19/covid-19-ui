import { createSlice } from '@reduxjs/toolkit'

import { TwitterEntry, Url, RegionId, Topic } from '@src/types'

import { fetchMetaAndFirstEntries, loadMoreTweets } from './asyncActions'

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

const twitterEntriesByRegionTopicSlice = createSlice({
  name: 'twitterEntriesByRegionTopic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMoreTweets.pending, (state, action) => {
        const { region, topic } = action.meta.arg
        createInitialStateForEachRegionTopic(state, region, topic)
        state[region][topic].loading = true
      })
      .addCase(loadMoreTweets.fulfilled, (state, action) => {
        const { region, topic } = action.meta.arg
        const newEntries = action.payload
        state[region][topic].loading = false
        if (newEntries.length === 0) {
          state[region][topic].noMore = true
        }
        state[region][topic].entries.push(...newEntries.map((e : TwitterEntry) => e.id))
        for (const id of newEntries.map((e : TwitterEntry) => e.id)) {
          if (state[region][topic].entries.includes(id)) continue
          state[region][topic].entries.push(id)
        }
      })
      .addCase(fetchMetaAndFirstEntries.fulfilled, (state, action) => {
        const { regions, topics } = action.payload
        for (const region of regions) {
          state[region.id] = {}
          for (const topic of topics) {
            state[region.id][topic] = {
              entries: [],
              noMore: false,
              loading: false
            }
          }
        }
      })
  }
})

export default twitterEntriesByRegionTopicSlice.reducer
