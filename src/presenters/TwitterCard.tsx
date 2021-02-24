import { memo, useEffect, useRef } from 'react'
import Col from 'react-bootstrap/Col'

import { TweetId, Url } from '@src/types'
import { Loading } from '@src/components/Loading'
import { useTranslation } from '@src/context/LanguageContext'

interface Props {
  entryIds: TweetId[]
  loading: boolean
  noMore: boolean
  onLoadMore: () => void
  renderEntry: (url: Url) => React.ReactElement
}

export const TwitterCard: React.FC<Props> = memo((props) => {
  const { t } = useTranslation()
  const { entryIds, loading, noMore, onLoadMore, renderEntry } = props

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
    <Col>
      <div className="wrap">
        <div className="scroll" ref={infiniteScrollWrapRef}>
          {entryIds.length == 0 && noMore && <div className="text-muted text-center p-2">{t('no_info')}</div>}
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
TwitterCard.displayName = 'TwitterCard'
