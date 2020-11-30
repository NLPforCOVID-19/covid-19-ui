import { createAsyncThunk, createSelector } from '@reduxjs/toolkit'

import * as API from '../api'

import { RootState } from '@src/redux/index'
import { Entry, Lang, RegionId, Topic } from '@src/types'

const entriesNumSelector = createSelector(
  (state: RootState, { region, topic }: { region: RegionId; topic: Topic }) =>
    state.entriesByRegionTopic[region][topic].entries,
  (entries) => entries.length
)

export const loadMore = createAsyncThunk<Entry[], { region: RegionId; topic: Topic; lang: Lang }, { state: RootState }>(
  'loadMore',
  async ({ region, topic, lang }, ThunkAPI) => {
    const offset = entriesNumSelector(ThunkAPI.getState(), { region, topic })
    return API.fetchNewsByClassAndCountry(topic, region, offset, 20, lang)
  }
)

export const fetchMetaAndFirstEntries = createAsyncThunk(
  'fetchMetaAndFirstEntries',
  async ({ lang }: { lang: Lang }) => {
    const { regions, topics } = await API.fetchMeta(lang)
    const entriesByRegion = await API.fetchEntriesAll(lang)
    return {
      regions,
      topics,
      entriesByRegion
    }
  }
)
