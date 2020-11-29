import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Url, RegionId, Topic } from '@src/types'
import { RootState } from '@src/redux/index'

import { fetchMeta, loadMore } from './asyncActions'

interface StateForEachRegionTopic {
  entries: Url[]
  isNoMore: boolean
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
      isNoMore: false,
      loading: false
    }
  }
}

const initialState: State = {}

interface LinkEntryPayload {
  region: RegionId
  topic: Topic
  url: Url
}

interface SetNoMorePayload {
  region: RegionId
  topic: Topic
}

const entriesByRegionTopicSlice = createSlice({
  name: 'entriesByRegionTopic',
  initialState,
  reducers: {
    linkEntryToRegionTopic(state, action: PayloadAction<LinkEntryPayload>) {
      const { region, topic, url } = action.payload
      createInitialStateForEachRegionTopic(state, region, topic)
      state[region][topic].entries.push(url)
    },
    setNoMoreToTrue(state, action: PayloadAction<SetNoMorePayload>) {
      const { region, topic } = action.payload
      createInitialStateForEachRegionTopic(state, region, topic)
      state[region][topic].isNoMore = true
    }
  },
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
          state[region][topic].isNoMore = true
        }
        state[region][topic].entries.push(...newEntries.map((e) => e.url))
      })
      .addCase(fetchMeta.fulfilled, (state, action) => {
        const { regions, topics } = action.payload
        for (const region of regions) {
          state[region.id] = {}
          for (const topic of topics) {
            state[region.id][topic] = {
              entries: [],
              isNoMore: false,
              loading: false
            }
          }
        }
      })
  }
})
export const { linkEntryToRegionTopic, setNoMoreToTrue } = entriesByRegionTopicSlice.actions

export const selectEntriesForRegionTopic = createSelector(
  [
    (state: RootState) => state.entriesByRegionTopic,
    (state) => state.entries.byUrl,
    (_, p: { region: RegionId; topic: Topic }) => p.region,
    (_, p) => p.topic
  ],
  (byRegionTopic, entriesByUrl, region, topic) => {
    return byRegionTopic[region][topic].entries.map((url) => entriesByUrl[url])
  }
)

export default entriesByRegionTopicSlice.reducer
