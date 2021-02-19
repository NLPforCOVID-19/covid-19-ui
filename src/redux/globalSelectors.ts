import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@src/redux/index'
import { RegionId, Topic, Url } from '@src/types'

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
    (s: RootState) => s.ui,
    (s: RootState) => s.regionsTopics,
    (s: RootState) => s.search
  ],
  (regionTopic, byUrl, ui, regionsTopics, search) => {
    const { viewMode, focusedToSearch } = ui
    const { activeRegion, activeTopic } = regionsTopics
    const ids: Url[] = []
    if (focusedToSearch) {
      const { byRegion } = search
      for (const regionId of regionsTopics.regions.allIds) {
        const idsForRegion = byRegion[regionId].allIds
        ids.push(...idsForRegion)
      }
    } else {
      switch (viewMode) {
        case 'region':
          if (activeRegion === 'int') {
            for (const regionId of regionsTopics.regions.allIds) {
              const idsForRT = regionTopic[regionId][activeTopic].entries
              ids.push(...idsForRT)
            }
            break
          }
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
    }
    const entries = ids.map((id) => (focusedToSearch ? search.byUrl[id] : byUrl[id])).filter((e) => e.flags.useful)
    const byCountryId: Record<string, Url[]> = {}
    for (const entry of entries) {
      if (!byCountryId[entry.country]) {
        byCountryId[entry.country] = []
      }
      if (byCountryId[entry.country].length >= 5) continue
      byCountryId[entry.country].push(entry.url)
    }
    return {
      allCountryIds: Object.keys(byCountryId),
      byCountryId: byCountryId
    }
  }
)

export const selectTwitterEntriesForRegionTopicSearch = createSelector(
  [
    (s: RootState) => s.twitterEntries.byId,
    (s: RootState) => s.twitterEntriesByRegionTopic,
    //(s: RootState) => s.search,
    (s: RootState) => null,
    //(s: RootState) => s.ui.focusedToSearch,
    (s: RootState) => null,
    (_: RootState, { region }: { region: RegionId }) => region,
    (_: RootState, { topic }: { topic: Topic }) => topic
  ],
  (entriesById, entriesByRT, search, focusedToSearch, r, t) => {
    //if (focusedToSearch) {
    //  return {
    //    byId: search.byUrl,
    //    allIds: search.byRegion[r].allIds
    //  }
    //}
    return {
      byId: entriesById,
      allIds: entriesByRT[r][t].entries
    }
  }
)
export const selectLoadingNoMoreTweetsForRegionTopicSearch = createSelector(
  [
    (s: RootState) => s.twitterEntriesByRegionTopic,
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
export const twitterEntriesNumSelector = createSelector(
  (state: RootState, { region, topic }: { region: RegionId; topic: Topic }) =>
    state.twitterEntriesByRegionTopic[region][topic].entries,
  (entries) => entries.length
)

