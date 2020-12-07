import { createSlice } from '@reduxjs/toolkit'

import { Entry, RegionId, Url } from '@src/types'
import { fetchMetaAndFirstEntries, searchForAllRegion } from '@src/redux/asyncActions'
import { RootState } from '@src/redux/index'

interface StateForRegion {
  allIds: Url[]
  loading: boolean
  noMore: boolean
}

interface State {
  query: string
  byUrl: Record<Url, Entry>
  byRegion: Record<RegionId, StateForRegion>
}

const initialState: State = { query: '', byUrl: {}, byRegion: {} }

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetaAndFirstEntries.fulfilled, (state, action) => {
        const { regions } = action.payload
        for (const regionId of regions.map((r) => r.id)) {
          state.byRegion[regionId] = {
            allIds: [],
            loading: false,
            noMore: false
          }
        }
      })
      .addCase(searchForAllRegion.pending, (state, action) => {
        const { query } = action.meta.arg
        state.query = query
        state.byUrl = {}
        for (const r of Object.keys(state.byRegion)) {
          state.byRegion[r] = {
            allIds: [],
            loading: true,
            noMore: false
          }
        }
      })
      .addCase(searchForAllRegion.fulfilled, (state, action) => {
        const searchRes = action.payload
        for (const r of Object.keys(searchRes)) {
          for (const e of searchRes[r]) {
            state.byUrl[e.url] = e
            state.byRegion[r].allIds.push(e.url)
          }
          state.byRegion[r].loading = false
          // TODO: loadMore
          state.byRegion[r].noMore = true
        }
      })
  }
})

export const selectCurrentQuery = (state: RootState) => state.search.query

export default searchSlice.reducer
