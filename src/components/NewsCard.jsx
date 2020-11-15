import React, { useRef, useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Page from './Page'
import Loading from './Loading'
import { ModifyModal } from './ModifyModal'
import { StoreContext, loadMore } from '../store'
import { useTranslation } from '../context/LanguageContext'

const countryIds = [
  'fr',
  'es',
  'de',
  'eu',
  'eur_other',
  'kr',
  'in',
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

const Country = ({ title, countryId, topic, onClickTitle, showEditButton, children }) => {
  const { t, lang } = useTranslation()
  const [state, dispatch] = useContext(StoreContext)

  const entries = state.news[topic][countryId]
  const { loading } = state.newsStates[topic][countryId]

  function handleClickTitle(e) {
    e.preventDefault()
    onClickTitle()
  }

  // EditModal
  const { topics } = state.meta
  const countries = countryIds.map((id) => ({
    id: id,
    name: t(id)
  }))
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)
  function openEditModal(entry) {
    setShowEditModal(true)
    setEditingEntry(entry)
  }
  function closeEditModal() {
    location.hash = ''
    setShowEditModal(false)
  }

  const observeEl = useRef(null)
  const wrapEl = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting && !loading) {
          dispatch(loadMore(countryId, topic, lang))
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

  useEffect(() => {
    if (wrapEl.current) {
      wrapEl.current.scrollTop = 0
    }
  }, [countryId, topic])

  return (
    <>
      <div className="col-xl-4 col-lg-6 p-1">
        <div className="p-2 border rounded">
          <div className="inner">
            <div className="header">
              <h5 className="m-0">
                <a href="#" onClick={handleClickTitle}>
                  {title}
                </a>
              </h5>
            </div>
            {children}
            {!loading && entries.length === 0 && <div className="no-data text-muted">{t('no_info')}</div>}
            <div ref={wrapEl} className="scroll mt-1 mb-1">
              <ul>
                {entries.map((entry, i) => (
                  <Page
                    key={i}
                    entry={entry}
                    topic={topic}
                    region={countryId}
                    showEditButton={showEditButton}
                    onClickEdit={() => openEditModal(entry)}
                  />
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
      {showEditModal && (
        <ModifyModal
          show={showEditModal}
          onHide={closeEditModal}
          countries={countries}
          topics={topics}
          entry={editingEntry}
        />
      )}
    </>
  )
}

Country.propTypes = {
  title: PropTypes.string.isRequired,
  countryId: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  onClickTitle: PropTypes.func.isRequired,
  showEditButton: PropTypes.bool,
  children: PropTypes.element
}

export default Country
