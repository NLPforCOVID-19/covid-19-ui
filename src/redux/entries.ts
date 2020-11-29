import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Url, Entry } from '@src/types'

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
  }
})

export const { addEntry } = entriesSlice.actions

export default entriesSlice.reducer
