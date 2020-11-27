import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Property } from 'csstype'

import Top = Property.Top

export type Url = string
type CountryId = string
export type Topic = string

interface Entry {
  country: CountryId
  title: string
  url: Url
  snippets: Record<Top, string>
}

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
