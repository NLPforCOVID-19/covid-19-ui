export const localeList = ['ja', 'en'] as const

export type Lang = typeof localeList[number]

export const countryIds = [
  'gb',
  'fr',
  'es',
  'de',
  'eu',
  'eur_other',
  'kr',
  'id',
  'in',
  'np',
  'my',
  'sg',
  'asia_other',
  'jp',
  'cn',
  'us',
  'us_other',
  'br',
  'sa_other',
  'au',
  'oceania_other',
  'za',
  'africa_other',
  'int'
]
// export type CountryId = typeof countryIds

export type Url = string
export type Topic = string
export type RegionId = string
export type UnixEpoch = number

interface EntryFlags {
  aboutRumor: boolean
  useful: boolean
}

export interface EntryFlagsEdit extends EntryFlags {
  hidden: boolean
  aboutCovid: boolean
}

export interface Entry {
  kind: 'Entry'
  url: Url
  country: string
  title: string
  timestamp: UnixEpoch
  domainUrl: string
  domainLabel: string
  flags: EntryFlags
  snippets: Record<Topic, string>
}

export interface TagForSearchSnippet {
  type: 'text' | 'match' | 'exact-match'
  content: string
}

export interface EntryWithSearchSnippet extends Omit<Entry, 'kind'> {
  kind: 'EntryWithSearchSnippet'
  searchSnippet: TagForSearchSnippet[]
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

export type ViewMode = 'topic' | 'region' | 'neutral'

export interface EditHistory {
  checked: boolean
  timestamp: UnixEpoch
  notes: string
}

export type SubmitState = 'pending' | 'fulfilled' | 'rejected'
