import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Page from './Page'
import Loading from './Loading'
import { searchNews } from '../api'
import { useTranslation } from '../context/LanguageContext'
import Stats from './Stats'
import { loadMore } from '../store'

const Card = ({ title, stats, entries, loading, onLoadMore }) => {
  const observeEl = React.useRef(null)
  const wrapEl = React.useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting && !loading) {
          onLoadMore()
        }
      },
      {
        root: wrapEl.current
      }
    )
    observer.observe(observeEl.current)
    function unobserve() {
      observer.unobserve(observeEl.current)
    }
    return unobserve
  }, [])
  return (
    <div className="col-xl-4 col-lg-6 p-1">
      <div className="p-2 border rounded">
        <div className="inner">
          <div className="header">
            <h5 className="m-0">
              <a href="#">{title}</a>
            </h5>
          </div>
          <div className="text-muted small">
            <Stats stats={stats} />
          </div>
          <div ref={wrapEl} className="scroll mt-1 mb-1">
            <ul>
              {entries.map((entry, i) => (
                <Page key={i} entry={entry} topic={''} region={''} showEditButton={false} onClickEdit={null} />
              ))}
            </ul>
            {loading && (
              <div className="loading">
                <Loading />
              </div>
            )}
            <div ref={observeEl} className="observe" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .material-icons {
          color: rgba(0, 0, 0, 0.5);
          display: inline-flex;
          vertical-align: middle;
          font-size: 1em;
        }
        .inner {
          height: 400px;
          display: flex;
          flex-flow: column nowrap;
        }
        .header {
          display: flex;
          align-items: flex-end;
          margin-bottom: 5px;
          flex: 0 0 auto;
        }
        .public-link {
          margin-left: 10px;
        }
        .scroll {
          display: flex;
          flex-flow: column nowrap;
          margin: 10px 0;
          overflow-y: auto;
        }
        .scroll > ul {
          padding-left: 0;
          list-style-type: none;
        }
        .no-data {
          margin: auto;
        }
        .loading {
          margin: auto;
          flex: 0 0 100px;
        }
        .observe {
          flex: 0 0 1px;
        }
      `}</style>
    </div>
  )
}

export const SearchView = ({ countries }) => {
  const { lang } = useTranslation()
  const [query, setQuery] = React.useState('')
  const [entries, setEntries] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const res = await searchNews(lang, query)
    setLoading(false)
    setEntries(res)
  }
  return (
    <Container>
      <Row>
        <form onSubmit={handleSubmit}>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>
      </Row>
      <Row>
        {countries.map((c) => (
          <Card key={c.country} title={c.name} stats={c.stats} entries={entries[c.country] || []} loading={loading} />
        ))}
      </Row>
    </Container>
  )
}
