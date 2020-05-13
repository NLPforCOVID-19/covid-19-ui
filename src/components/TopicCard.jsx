import React, { useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Page from './Page'
import Loading from './Loading'
import { StoreContext, loadMore } from '../store'

const Country = ({ countryId, topic }) => {
  const [state, dispatch] = useContext(StoreContext)

  const entries = state.news[topic][countryId]
  const { loading } = state.newsStates[topic][countryId]

  const observeEl = useRef(null)
  const wrapEl = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting && !loading) {
          dispatch(loadMore(countryId, topic))
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
  })

  return (
    <div className="col-xl-4 col-lg-6 p-1">
      <div className="p-2 border rounded">
        <div className="inner">
          <h5 className="m-0">{topic}</h5>
          {!loading && entries.length === 0 && (
            <div className="no-data text-muted">情報はありません</div>
          )}
          <div ref={wrapEl} className="scroll mt-1 mb-1">
            <ul>
              {entries.map((entry, i) => (
                <Page key={i} entry={entry} topic={topic} />
              ))}
            </ul>
            {loading && (
              <div className="loading">
                <Loading />
              </div>
            )}
            <div ref={observeEl} className="observe"></div>
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

Country.propTypes = {
  countryId: PropTypes.string,
  topic: PropTypes.string
}

export default Country