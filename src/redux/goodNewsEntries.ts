import { createSlice } from '@reduxjs/toolkit'

import { Url, Entry } from '@src/types'
import { loadMoreGoodNews } from '@src/redux/asyncActions'

interface State {
  byUrl: Record<Url, Entry>
}

const initialState: State = {
  byUrl: {}
}

const skipsertEntries = (state: State, entries: Entry[]) => {
  state.byUrl = {}
  for (const e of entries) {
    if (state.byUrl[e.url]) continue
    state.byUrl[e.url] = e
  }
}

const goodNewsEntriesSlice = createSlice({
  name: 'goodNewsEntries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadMoreGoodNews.fulfilled, (state, action) => skipsertEntries(state, action.payload))
  }
})

export default goodNewsEntriesSlice.reducer
