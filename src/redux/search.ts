import { createSlice } from '@reduxjs/toolkit'

import { EntryWithSearchSnippet, RegionId, TagForSearchSnippet, Url } from '@src/types'
import { fetchMetaAndFirstEntries, searchForAllRegion } from '@src/redux/asyncActions'
import { RootState } from '@src/redux/index'

const parseTextWithTags = (text: string): TagForSearchSnippet[] => {
  const result: TagForSearchSnippet[] = []
  const [firstText, ...afterEmBeginTags] = text.split('<em>')
  if (firstText.length > 0) {
    result.push({ type: 'text', content: firstText })
  }
  for (const afterEmBeginTag of afterEmBeginTags) {
    const [emTagTextContent, textOutOfEmTag] = afterEmBeginTag.split('</em>')
    result.push({ type: 'match', content: emTagTextContent })
    if (textOutOfEmTag.length > 0) {
      result.push({ type: 'text', content: textOutOfEmTag })
    }
  }
  return result
}

const findExactMatch = (tags: TagForSearchSnippet[], query: string): TagForSearchSnippet[] => {
  const result = [] as TagForSearchSnippet[]
  let buffer = [] as TagForSearchSnippet[]
  for (const tag of tags) {
    switch (tag.type) {
      case 'match': {
        buffer.push(tag)
        const joined = buffer.map((tag) => tag.content).join('')
        if (joined === query) {
          result.push({ type: 'exact-match', content: query })
          buffer = []
        }
        break
      }
      case 'text':
      default:
        result.push(...buffer, tag)
        buffer = []
        break
    }
  }
  return result
}

interface StateForRegion {
  allIds: Url[]
  loading: boolean
  noMore: boolean
}

interface State {
  query: string
  byUrl: Record<Url, EntryWithSearchSnippet>
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
        const { query } = state
        for (const r of Object.keys(searchRes)) {
          for (const e of searchRes[r]) {
            const snippetTags = findExactMatch(parseTextWithTags(e.snippets['Search']), query)
            const entryWithSearchSnippet: EntryWithSearchSnippet = {
              ...e,
              kind: 'EntryWithSearchSnippet',
              searchSnippet: snippetTags
            }
            state.byUrl[entryWithSearchSnippet.url] = entryWithSearchSnippet
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
