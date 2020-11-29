import { createSlice } from '@reduxjs/toolkit'

import { Url, Entry } from '@src/types'
import { fetchMetaAndFirstEntries, loadMore } from '@src/redux/asyncActions'

interface State {
  byUrl: Record<Url, Entry>
  allUrl: Url[]
}

const initialState: State = {
  byUrl: {},
  allUrl: []
}

const addEntries = (state: State, entries: Entry[]) => {
  for (const e of entries) {
    if (state.byUrl[e.url]) continue
    state.byUrl[e.url] = e
    state.allUrl.push(e.url)
  }
}

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMore.fulfilled, (state, action) => addEntries(state, action.payload))
      .addCase(fetchMetaAndFirstEntries.fulfilled, (state, action) => {
        const { entriesByRegion, regions } = action.payload
        for (const r of regions) {
          addEntries(state, entriesByRegion[r.id])
        }
      })
  }
})

export default entriesSlice.reducer
