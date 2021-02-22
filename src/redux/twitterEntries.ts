import { createSlice } from '@reduxjs/toolkit'

import { TweetId, TwitterEntry } from '@src/types'
import { loadMoreTweets } from '@src/redux/asyncActions'

interface State {
  byId: Record<TweetId, TwitterEntry>
}

const initialState: State = {
  byId: {}
}

const skipsertTwitterEntries = (state: State, entries: TwitterEntry[]) => {
  for (const e of entries) {
    if (state.byId[e.id]) continue
    state.byId[e.id] = e
  }
}

const twitterEntriesSlice = createSlice({
  name: 'twitterEntries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadMoreTweets.fulfilled, (state, action) => skipsertTwitterEntries(state, action.payload))
  }
})

export default twitterEntriesSlice.reducer
