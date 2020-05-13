import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { StoreContext } from '@src/store'
import Header from '@src/components/Header'
import Footer from '@src/components/Footer'
import Loading from '@src/components/Loading'
import TopicCard from '@src/components/TopicCard'
import IndicatorLegends from '@src/components/IndicatorLegends'
import Stats from '../../components/Stats'

const CountryPage = () => {
  const router = useRouter()
  const { countryId } = router.query
  const [state, dispatch] = useContext(StoreContext)

  if (!state.metaLoaded) {
    return (
      <Container className="mt-3 text-center">
        <Loading />
      </Container>
    )
  }

  const { topics } = state.meta
  const country = state.meta.countries.find((c) => c.country === countryId)

  if (!country) {
    return (
      <div>NOT FOUND</div>
    )
  }

  return (
    <div>
      <Header />
      <Container className="mt-3">
        <Row>
          <div className="p-1">
            <Link href={`${process.env.BASE_PATH}/`}>
              <a className="text-secondary">戻る</a>
            </Link>
          </div>
        </Row>
        <Row>
          <div className="country-names">
            <h2>{country.name.ja}</h2>
            <div className="stats text-muted"><Stats stats={country.stats} /></div>
            <div className="public-link small"><a href={country.representativeSiteUrl} target="_blank">公的機関のウェブサイトを確認する</a></div>
          </div>
        </Row>
        <Row>
          <IndicatorLegends />
        </Row>
        <Row>
          {topics.map((topic, i) => (
            <TopicCard key={i} topic={topic} countryId={countryId} />
          ))}
        </Row>
      </Container>
      <Footer />
      <style jsx>{`
        .country-names {
          padding: 10px 0;
          display: flex;
          align-items: flex-end;
        }
        h2 {
          margin: 0;
        }
        .stats, .public-link {
          margin: 0 10px;
        }
      `}</style>
    </div>
  )
}

export default CountryPage
