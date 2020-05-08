import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { StoreContext } from '../../store'

const CountryPage = (props) => {
  const router = useRouter()
  const { countryId } = router.query
  const [state, dispatch] = useContext(StoreContext)

  if (!state.metaLoaded) {
    return <div>NOOOO</div>
  }

  const { topics } = state.meta
  const country = state.meta.countries.find(c => c.country === countryId)

  return (
    <div>
      <h1>{country.name.ja}</h1>
      <ul>
        {topics.map((t, i) => (
          <li key={i}>
            <h2>{t}</h2>
            <ul>
              {state.news[t][countryId].map(e => (
                <li key={e.url}>{e.ja_translated.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CountryPage
