export const localeList = ['ja', 'en'] as const

export type Lang = typeof localeList[number]

export type Url = string
type CountryId = string
export type Topic = string
export type RegionId = string
type UnixEpoch = number

export interface Entry {
  url: Url
  country: CountryId
  title: string
  timestamp: UnixEpoch
  domainLabel: string
  flags: {
    aboutRumor: boolean
    useful: boolean
  }
  snippets: Record<Topic, string>
}

export interface RegionStats {
  confirmToday: number
  confirmTotal: number
  deathToday: number
  deathTotal: number
}

export interface Region {
  id: RegionId
  name: string
  officialUrl: string
  sourceUrls: string[]
  stats: RegionStats
}
