export type Url = string
type CountryId = string
export type Topic = string
export type RegionId = string

export interface Entry {
  url: Url
  country: CountryId
  title: string
  timestamp: Date
  domainLabel: string
  flags: {
    aboutRumor: boolean
    useful: boolean
  }
  snippets: Record<Topic, string>
}

interface RegionStats {
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
