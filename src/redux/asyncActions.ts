import { createAsyncThunk } from '@reduxjs/toolkit'

import * as API from '../api'

import { RootState } from '@src/redux/index'
import { Entry, Lang, RegionId, Topic, ViewMode } from '@src/types'
import { entriesNumSelector } from '@src/redux/globalSelectors'

const parseHashToViewState = (hash: string): { mode: ViewMode; target: string } => {
  // #r/jp -> ['r', 'jp']
  const [mode, target] = decodeURIComponent(hash).slice(1).split('/')
  if (!(mode && target)) {
    return { mode: 'neutral', target: '' }
  }
  switch (mode) {
    case 'r':
      return { mode: 'region', target }
    case 't':
      return { mode: 'topic', target }
    default:
      return { mode: 'neutral', target: '' }
  }
}

export const fetchMetaAndFirstEntries = createAsyncThunk(
  'fetchMetaAndFirstEntries',
  async ({ lang, hash }: { lang: Lang; hash: string }) => {
    const { mode, target } = parseHashToViewState(hash)
    const { regions, topics } = await API.fetchMeta(lang)
    return {
      regions,
      topics,
      mode: mode === 'neutral' ? 'topic' : mode,
      activeTopic: mode === 'topic' ? target : topics[0],
      activeRegion: mode === 'region' ? target : regions[0].id
    }
  }
)

export const loadMore = createAsyncThunk<Entry[], { region: RegionId; topic: Topic; lang: Lang }, { state: RootState }>(
  'loadMore',
  async ({ region, topic, lang }, ThunkAPI) => {
    const offset = entriesNumSelector(ThunkAPI.getState(), { region, topic })
    return API.fetchNewsByClassAndCountry(topic, region, offset, 20, lang)
  }
)

export const searchForAllRegion = createAsyncThunk(
  'searchForAllRegion',
  async (args: { lang: Lang; query: string }) => {
    const { lang, query } = args
    return API.searchNews(lang, query)
  }
)

export const loadMoreTweets = createAsyncThunk<TwitterEntry[], { region: RegionId; topic: Topic; lang: Lang }, { state: RootState }>(
  'loadMoreTweets',
  async ({ region, topic, lang }, ThunkAPI) => {
    const offset = entriesNumSelector(ThunkAPI.getState(), { region, topic })
    // We ignore the topic for tweets because they all belong to the "all" category.
    return API.fetchTweetsByClassAndCountry("all", region, offset, 20, lang)
  }
)

