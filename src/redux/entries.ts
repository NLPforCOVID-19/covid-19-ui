import { createSelector, createSlice } from '@reduxjs/toolkit'

import { Url, Entry } from '@src/types'
import { fetchMetaAndFirstEntries, loadMore } from '@src/redux/asyncActions'
import { RootState } from '@src/redux/index'

interface State {
  byUrl: Record<Url, Entry>
}

const initialState: State = {
  byUrl: {}
}

const skipsertEntries = (state: State, entries: Entry[]) => {
  for (const e of entries) {
    if (state.byUrl[e.url]) continue
    state.byUrl[e.url] = e
  }
}

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMore.fulfilled, (state, action) => skipsertEntries(state, action.payload))
      .addCase(fetchMetaAndFirstEntries.fulfilled, (state, action) => {
        const { entriesByRegion, regions } = action.payload
        for (const r of regions) {
          for (const e of entriesByRegion[r.id]) {
            state.byUrl[e.url] = e
          }
        }
      })
  }
})

export const selectEntryByUrl = createSelector(
  [(state: RootState) => state.entries.byUrl, (_, url: Url) => url],
  (byUrl, url) => byUrl[url]
)

export default entriesSlice.reducer
