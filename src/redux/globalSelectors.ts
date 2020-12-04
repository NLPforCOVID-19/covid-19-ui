import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@src/redux/index'
import { RegionId, Topic } from '@src/types'

export const entriesNumSelector = createSelector(
  (state: RootState, { region, topic }: { region: RegionId; topic: Topic }) =>
    state.entriesByRegionTopic[region][topic].entries,
  (entries) => entries.length
)
export const createNewsViewHash = createSelector(
  [
    (state: RootState) => state.ui.viewMode,
    (state: RootState) => state.regionsTopics.activeRegion,
    (state: RootState) => state.regionsTopics.activeTopic
  ],
  (mode, region, topic) => {
    switch (mode) {
      case 'region':
        return `#r/${region}`
      case 'topic':
        return `#t/${topic}`
      default:
        return ''
    }
  }
)
export const selectEntriesForRegionTopicSearch = createSelector(
  [
    (s: RootState) => s.entries.byUrl,
    (s: RootState) => s.entriesByRegionTopic,
    (s: RootState) => s.search,
    (s: RootState) => s.ui.focusedToSearch,
    (_: RootState, { region }: { region: RegionId }) => region,
    (_: RootState, { topic }: { topic: Topic }) => topic
  ],
  (entriesByUrl, entriesByRT, search, focusedToSearch, r, t) => {
    if (focusedToSearch) {
      return {
        byId: search.byUrl,
        allIds: search.byRegion[r].allIds
      }
    }
    return {
      byId: entriesByUrl,
      allIds: entriesByRT[r][t].entries
    }
  }
)
export const selectLoadingNoMoreForRegionTopicSearch = createSelector(
  [
    (s: RootState) => s.entriesByRegionTopic,
    (s: RootState) => s.search.byRegion,
    (s: RootState) => s.ui.focusedToSearch,
    (_: RootState, { region }: { region: RegionId }) => region,
    (_: RootState, { topic }: { topic: Topic }) => topic
  ],
  (byRT, searchByR, focus, r, t) => {
    const { loading, noMore } = focus ? searchByR[r] : byRT[r][t]
    return { loading, noMore }
  }
)