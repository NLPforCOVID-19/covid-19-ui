import { createSlice } from '@reduxjs/toolkit'

import { TweetId, TwitterEntry } from '@src/types'
import { loadMore } from '@src/redux/asyncActions'

interface TwitterState {
  byId: Record<TweetId, TwitterEntry>
}

const initialTwitterState: TwitterState = {
  byId: {}
}

const skipsertTwitterEntries = (state: TwitterState, entries: TwitterEntry[]) => {
  for (const e of entries) {
    if (state.byId[e.id]) continue
    state.byId[e.id] = e
  }
}

const twitterEntriesSlice = createSlice({
  name: 'twitter_entries',
  initialTwitterState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadMore.fulfilled, (state, action) => skipsertTwitterEntries(state, action.payload))
  }
})

export default twitterEntriesSlice.reducer

