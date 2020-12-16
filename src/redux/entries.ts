import { createSlice } from '@reduxjs/toolkit'

import { Url, Entry } from '@src/types'
import { loadMore } from '@src/redux/asyncActions'

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
    builder.addCase(loadMore.fulfilled, (state, action) => skipsertEntries(state, action.payload))
  }
})

export default entriesSlice.reducer
