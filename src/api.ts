import axios from 'axios'

import { Entry, Lang, Region, RegionId, Topic } from '@src/types'

const baseUrl = process.env.API_URL

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

const parseResponseEntry = (responseEntry: ResponseEntry): Entry => {
  const snippets: Record<Topic, string> = {}
  for (const topic of responseEntry.topics) {
    snippets[topic.name] = topic.snippet
  }
  return {
    url: responseEntry.url,
    country: responseEntry.displayed_country,
    title: responseEntry.translated.title,
    timestamp: Date.parse(responseEntry.orig.timestamp),
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

export async function fetchNewsByClass(klass, limit, lang) {
  const path = `/classes/${klass}`
  const response = await axios.get(baseUrl + path, {
    params: {
      start: 0,
      limit: limit || 20,
      lang: lang
    }
  })
  return response.data
}

export async function searchNews(lang, query) {
  const path = '/classes/search'
  const response = await axios.get(baseUrl + path, {
    params: {
      start: 0,
      limit: 50,
      lang,
      query
    }
  })
  return response.data
}

export async function searchNewsByRegion(topic, region, lang, query, start) {
  const path = `/classes/search/${region}`
  const response = await axios.get(baseUrl + path, {
    params: {
      start,
      lang,
      query
    }
  })
  return response.data
}

export const fetchEntriesAll = async (lang: Lang): Promise<Record<RegionId, Entry[]>> => {
  const path = `/classes/all`
  const response = await axios.get<Record<RegionId, ResponseEntry[]>>(baseUrl + path, {
    params: {
      limit: 5,
      lang
    }
  })
  const entriesByRegion = {}
  for (const r of Object.keys(response.data)) {
    entriesByRegion[r] = response.data[r].map(parseResponseEntry)
  }
  return entriesByRegion
}

export async function fetchNewsByClassAndCountry(klass, country, offset, limit, lang: Lang): Promise<Entry[]> {
  const path = `/classes/${klass}/${country}`
  const response = await axios.get<ResponseEntry[]>(baseUrl + path, {
    params: {
      start: offset,
      limit: limit || 10,
      lang: lang
    }
  })
  return response.data.map(parseResponseEntry)
}

export async function fetchMeta(lang): Promise<{ regions: Region[]; topics: string[] }> {
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
  url,
  { aboutCovid, useful, hidden, aboutRumor, country, topics },
  notes,
  password
) {
  const path = '/update'
  const data = {
    url: url,
    new_displayed_country: country,
    new_classes: topics,
    is_hidden: hidden,
    is_useful: useful,
    'is_about_COVID-19': aboutCovid,
    is_about_false_rumor: aboutRumor,
    notes: notes,
    password: password
  }
  return axios.post(baseUrl + path, data)
}

export async function fetchHistory(url) {
  const path = '/history'
  const response = await axios.get(baseUrl + path, {
    params: {
      url
    }
  })
  return response.data
}

export function postFeedback(content) {
  const path = '/feedback'
  const data = {
    content
  }
  return axios.post(baseUrl + path, data)
}
