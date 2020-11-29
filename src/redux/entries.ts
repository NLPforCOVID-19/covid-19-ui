import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Url, Entry } from '@src/types'
import { loadMore } from '@src/redux/asyncActions'

const initialState: { byUrl: Record<Url, Entry>; allUrl: Url[] } = {
  byUrl: {},
  allUrl: []
}

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<Entry>) {
      const { url } = action.payload
      if (state.byUrl[url]) return
      state.byUrl[url] = action.payload
      state.allUrl.push(url)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadMore.fulfilled, (state, action) => {
      const newEntries = action.payload
      for (const entry of newEntries) {
        if (state.byUrl[entry.url]) continue
        state.byUrl[entry.url] = entry
        state.allUrl.push(entry.url)
      }
    })
  }
})

export const { addEntry } = entriesSlice.actions

export default entriesSlice.reducer
