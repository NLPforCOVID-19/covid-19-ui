import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RegionId = string

interface RegionStats {
  confirmation_today: number
  confirmation_total: number
  death_today: number
  death_total: number
}

interface Region {
  id: RegionId
  name: string
  officialUrl: string
  sourceUrls: string[]
  stats: RegionStats
}

const initialState: { byId: Record<RegionId, Region>; allIds: RegionId[] } = {
  byId: {},
  allIds: []
}

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    addRegion(state, action: PayloadAction<Region>) {
      const { id } = action.payload
      if (state.byId[id]) return
      state.byId[id] = action.payload
      state.allIds.push(id)
    }
  }
})
export const { addRegion } = regionsSlice.actions
export default regionsSlice.reducer
