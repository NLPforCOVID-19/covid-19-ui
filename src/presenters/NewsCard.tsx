import Col from 'react-bootstrap/Col'
import { memo, useCallback, useEffect, useRef } from 'react'

import { Url } from '@src/types'
import { Loading } from '@src/components/Loading'
import { useTranslation } from '@src/context/LanguageContext'

interface Props {
  title: string
  entryIds: Url[]
  loading: boolean
  noMore: boolean
  onClickTitle: () => void
  onLoadMore: () => void
  renderEntry: (url: Url) => React.ReactElement
  renderSubInfo?: () => React.ReactElement
}

export const NewsCard: React.FC<Props> = memo((props) => {
  const { t } = useTranslation()
  const { title, entryIds, loading, onClickTitle, noMore, onLoadMore, renderEntry, renderSubInfo } = props
  const handleClickTitle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      onClickTitle()
    },
    [onClickTitle]
  )

  const infiniteScrollWrapRef = useRef<HTMLDivElement>(null)
  const infiniteScrollObserveRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observeEl = infiniteScrollObserveRef.current
    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting && !loading && !noMore) {
          onLoadMore()
        }
      },
      { root: infiniteScrollWrapRef.current }
    )
    if (observeEl) {
      observer.observe(observeEl)
    }
    return () => {
      if (observeEl) {
        observer.unobserve(observeEl)
      }
    }
  }, [infiniteScrollWrapRef, infiniteScrollObserveRef, loading, noMore, onLoadMore])

  return (
    <Col xl={4} lg={6} className="p-1">
      <div className="p-2 rounded border wrap">
        <div className="header">
          <a href="#" onClick={handleClickTitle}>
            {title}
          </a>
        </div>
        {renderSubInfo && <div className="small text-muted">{renderSubInfo()}</div>}
        <div className="scroll" ref={infiniteScrollWrapRef}>
          {entryIds.length === 0 && noMore && <div className="text-muted text-center p-2">{t('no_info')}</div>}
          {entryIds.map(renderEntry)}
          {loading && (
            <div className="text-center p-2">
              <Loading />
            </div>
          )}
          <div ref={infiniteScrollObserveRef} className="scroll-observe" />
        </div>
      </div>
      <style jsx>{`
        .wrap {
          height: 410px;
          display: flex;
          flex-flow: column nowrap;
        }
        .header {
          font-size: 1.3rem;
        }
        .scroll {
          overflow-y: auto;
        }
        .scroll-observe {
          height: 1px;
        }
      `}</style>
    </Col>
  )
})
NewsCard.displayName = 'NewsCard'
