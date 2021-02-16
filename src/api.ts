import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Entry, EntryFlagsEdit, EditHistory, Lang, Region, RegionId, Topic } from '@src/types'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

type ResponseBool = 0 | 1

interface ResponseRegion {
  country: string
  name: string
  representativeSiteUrl: string
  sources: string[]
  stats: {
    confirmation_today: number
    confirmation_total: number
    death_today: number
    death_total: number
  }
}

interface ResponseTopic {
  name: string
  snippet: string
}

interface ResponseEntry {
  displayed_country: string
  domain: string
  domain_label: string
  is_about_false_rumor: ResponseBool
  is_useful: ResponseBool
  orig: {
    timestamp: string
  }
  topics: ResponseTopic[]
  translated: {
    title: string
  }
  url: string
}

interface HistoryResponse {
  is_checked: ResponseBool
  notes?: string
  time?: string
}

const parseResponseEntry = (responseEntry: ResponseEntry): Entry => {
  const snippets: Record<Topic, string> = {}
  for (const topic of responseEntry.topics) {
    snippets[topic.name] = topic.snippet
  }
  return {
    kind: 'Entry',
    url: responseEntry.url,
    country: responseEntry.displayed_country,
    title: responseEntry.translated.title,
    timestamp: Date.parse(responseEntry.orig.timestamp),
    domainUrl: responseEntry.domain,
    domainLabel: responseEntry.domain_label,
    flags: {
      aboutRumor: responseEntry.is_about_false_rumor === 1,
      useful: responseEntry.is_useful === 1
    },
    snippets: snippets
  }
}

const parseResponseRegion = (responseRegion: ResponseRegion): Region => {
  const { stats } = responseRegion
  return {
    id: responseRegion.country,
    name: responseRegion.name,
    officialUrl: responseRegion.representativeSiteUrl,
    sourceUrls: responseRegion.sources,
    stats: {
      confirmToday: stats.confirmation_today,
      confirmTotal: stats.confirmation_total,
      deathToday: stats.death_today,
      deathTotal: stats.death_total
    }
  }
}

export async function searchNews(lang: Lang, query: string): Promise<Record<RegionId, Entry[]>> {
  const path = '/articles/search'
  const response = await axios.get<Record<RegionId, ResponseEntry[]>>(baseUrl + path, {
    params: {
      start: 0,
      limit: 50,
      lang,
      query
    }
  })
  const entriesByRegion: Record<RegionId, Entry[]> = {}
  for (const r of Object.keys(response.data)) {
    entriesByRegion[r] = response.data[r].map(parseResponseEntry)
  }
  return entriesByRegion
}

// export async function searchNewsByRegion(topic, region, lang, query, start) {
//   const path = `/classes/search/${region}`
//   const response = await axios.get(baseUrl + path, {
//     params: {
//       start,
//       lang,
//       query
//     }
//   })
//   return response.data
// }

export const fetchEntriesAll = async (lang: Lang, limitPerRegion?: number): Promise<Record<RegionId, Entry[]>> => {
  const path = `/articles/all`
  const response = await axios.get<Record<RegionId, ResponseEntry[]>>(baseUrl + path, {
    params: {
      limit: limitPerRegion === undefined ? 10 : limitPerRegion,
      lang
    }
  })
  const entriesByRegion: Record<RegionId, Entry[]> = {}
  for (const r of Object.keys(response.data)) {
    entriesByRegion[r] = response.data[r].map(parseResponseEntry)
  }
  return entriesByRegion
}

export async function fetchNewsByClassAndCountry(
  klass: Topic,
  country: RegionId,
  offset: number,
  limit: number,
  lang: Lang
): Promise<Entry[]> {
  const path = `/articles/${klass}/${country}`
  const response = await axios.get<ResponseEntry[]>(baseUrl + path, {
    params: {
      start: offset,
      limit: limit,
      lang: lang
    }
  })
  return response.data.map(parseResponseEntry)
}

export async function fetchMeta(lang: Lang): Promise<{ regions: Region[]; topics: string[] }> {
  const path = '/meta'
  const response = await axios.get<{ countries: ResponseRegion[]; topics: string[] }>(baseUrl + path, {
    params: {
      lang: lang
    }
  })
  const { countries, topics } = response.data
  return {
    regions: countries.map(parseResponseRegion),
    topics
  }
}

export async function modifyRegionCategory(
  url: string,
  data: { country: string; topics: Topic[]; flags: EntryFlagsEdit; notes: string; password: string }
) {
  const path = '/update'
  const { country, topics, flags, notes, password } = data
  const postData = {
    url,
    new_displayed_country: country,
    new_classes: topics,
    is_hidden: flags.hidden,
    is_useful: flags.useful,
    'is_about_COVID-19': flags.aboutCovid,
    is_about_false_rumor: flags.aboutRumor,
    notes,
    password
  }
  return axios.post(baseUrl + path, postData)
}

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(utc)

export async function fetchHistory(url: string): Promise<EditHistory> {
  const path = '/history'
  const response = await axios.get<HistoryResponse>(baseUrl + path, {
    params: {
      url
    }
  })
  const { is_checked, time, notes } = response.data
  return {
    checked: is_checked === 1,
    timestamp: time ? dayjs.utc(time).valueOf() : 0,
    notes: notes || ''
  }
}

export function postFeedback(content: string) {
  const path = '/feedback'
  const data = {
    content
  }
  return axios.post(baseUrl + path, data)
}
