import { createAsyncThunk, createSelector } from '@reduxjs/toolkit'

import * as API from '../api'

import { RootState } from '@src/redux/index'
import { Entry, RegionId, Topic } from '@src/types'

const entriesNumSelector = createSelector(
  (state: RootState, { region, topic }: { region: RegionId; topic: Topic }) =>
    state.entriesByRegionTopic[region][topic].entries,
  (entries) => entries.length
)

export const loadMore = createAsyncThunk<Entry[], { region: RegionId; topic: Topic }, { state: RootState }>(
  'loadMore',
  async ({ region, topic }, ThunkAPI) => {
    const offset = entriesNumSelector(ThunkAPI.getState(), { region, topic })
    return API.fetchNewsByClassAndCountry(topic, region, offset, 20, 'ja')
  }
)

export const fetchMetaAndFirstEntries = createAsyncThunk('fetchMetaAndFirstEntries', async () => {
  const { regions, topics } = await API.fetchMeta('ja')
  const entriesByRegion = await API.fetchEntriesAll()
  return {
    regions,
    topics,
    entriesByRegion
  }
})
