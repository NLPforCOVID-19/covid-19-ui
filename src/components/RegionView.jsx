import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import IndicatorLegends from './IndicatorLegends'
import Tabs from './Tabs'
import Row from 'react-bootstrap/Row'
import Stats from './Stats'
import NewsCard from './NewsCard'
import { StoreContext } from '../store'
import { useTranslation } from '../context/LanguageContext'

export const RegionView = ({ selectedCountry, onClickRegion, onClickTopic, showEditButton }) => {
  const { t } = useTranslation()
  const [state] = useContext(StoreContext)
  const selectedCountryData = state.meta.countries.find((c) => c.country === selectedCountry)
  const selectedCountryName = selectedCountryData.name
  const countryNames = state.meta.countries.map((c) => c.name)
  const sources = selectedCountryData.sources
  return (
    <Container className="mt-3">
      <IndicatorLegends />
      <Tabs
        active={selectedCountryName}
        choices={countryNames}
        onChange={(idx) => onClickRegion(state.meta.countries[idx].country)}
      />
      <Container>
        <Row className="mt-2">
          <div className="country-names">
            <div className="stats text-muted">
              {selectedCountryName}: <Stats stats={selectedCountryData.stats} />
            </div>
            <div className="public-link small">
              <a href={selectedCountryData.representativeSiteUrl} target="_blank" rel="noopener">
                {t('check_public_website')}
              </a>
            </div>
          </div>
        </Row>
        <Row className="mt-2">
          {state.meta.topics.map((t) => (
            <NewsCard
              key={t}
              title={t}
              countryId={selectedCountry}
              topic={t}
              onClickTitle={() => onClickTopic(t)}
              showEditButton={showEditButton}
            />
          ))}
        </Row>
        <Row className="mt-2">
          <h4>{t('情報源のサイト')}</h4>
        </Row>
        <Row>
          <div>
            {sources.map((url, i) => (
              <div key={i}>
                <a href={url} target="_blank" rel="noopener">
                  {url}
                </a>
              </div>
            ))}
          </div>
        </Row>
      </Container>
      <style jsx>{`
        .country-names {
          display: flex;
          align-items: flex-end;
        }
        h2 {
          margin: 0;
        }
        .stats,
        .public-link {
          margin: 0 10px;
        }
      `}</style>
    </Container>
  )
}
