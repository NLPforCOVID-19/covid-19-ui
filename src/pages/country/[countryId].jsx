import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '@src/components/Layout'
import { StoreContext } from '@src/store'
import Loading from '@src/components/Loading'
import TopicCard from '@src/components/TopicCard'
import IndicatorLegends from '@src/components/IndicatorLegends'
import Stats from '@src/components/Stats'
import meta from '@src/meta'

const CountryPage = () => {
  const router = useRouter()
  const { countryId } = router.query
  const [state, dispatch] = useContext(StoreContext)

  if (!state.metaLoaded) {
    return (
      <Layout>
        <div className="mt-3 text-center"><Loading /></div>
      </Layout>
    )
  }

  const { topics } = state.meta
  const country = state.meta.countries.find((c) => c.country === countryId)

  if (!country) {
    return (
      <Layout>
        <div className="m-3">
          <p>このページは表示できません</p>
          <Link href={`${process.env.BASE_PATH}/`}><a>トップページ</a></Link>
        </div>
      </Layout>
    )
  }

  const urls = meta.regions[countryId] || []

  return (
    <Layout>
      <Container className="mt-3">
        <Row>
          <div className="p-1">
            <Link href={`${process.env.BASE_PATH}/`}>
              <a className="text-secondary">トップページに戻る</a>
            </Link>
          </div>
        </Row>
        <Row>
          <div className="country-names">
            <h2>{country.name.ja}</h2>
            <div className="stats text-muted"><Stats stats={country.stats} /></div>
            <div className="public-link small">
              <a href={country.representativeSiteUrl} target="_blank" rel="noopener">公的機関のウェブサイトを確認する</a>
            </div>
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
        <Row className="mt-2">
          <h4>情報源のサイト</h4>
        </Row>
        <Row>
          <div>
            {urls.map((url, i) => (
              <div key={i}><a href={url} target="_blank" rel="noopener">{url}</a></div>
            ))}
          </div>
        </Row>
      </Container>
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
    </Layout>
  )
};

export default CountryPage
