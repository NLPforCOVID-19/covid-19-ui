import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@src/redux/index'
import { RegionId, Topic, Url, ViewMode } from '@src/types'

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

export const selectEntriesForMap = createSelector(
  [
    (s: RootState) => s.entriesByRegionTopic,
    (s: RootState) => s.entries.byUrl,
    (s: RootState) => s.ui.viewMode,
    (s: RootState) => s.regionsTopics
  ],
  (regionTopic, byUrl, viewMode: ViewMode, regionsTopics) => {
    const { activeRegion, activeTopic } = regionsTopics
    const ids: Url[] = []
    switch (viewMode) {
      case 'region':
        for (const topic of regionsTopics.topics.allIds) {
          const idsForRT = regionTopic[activeRegion][topic].entries
          let cnt = 0
          for (const id of idsForRT) {
            if (cnt >= 2) break
            if (!ids.includes(id)) {
              ids.push(id)
              cnt += 1
            }
          }
        }
        break
      case 'topic':
        for (const regionId of regionsTopics.regions.allIds) {
          const idsForRT = regionTopic[regionId][activeTopic].entries
          ids.push(...idsForRT)
        }
        break
      case 'neutral':
      default:
        // left ids empty
        break
    }
    const entries = ids.map((id) => byUrl[id]).filter((e) => e.flags.useful)
    const byCountryId: Record<string, Url[]> = {}
    for (const entry of entries) {
      if (!byCountryId[entry.country]) {
        byCountryId[entry.country] = []
      }
      if (byCountryId[entry.country].length >= 5) continue
      byCountryId[entry.country].push(entry.url)
    }
    return {
      allIds: Object.keys(byCountryId),
      byId: byCountryId
    }
  }
)
