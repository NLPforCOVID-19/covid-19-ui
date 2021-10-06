import { memo, useEffect, useRef } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useTranslation } from '@src/context/LanguageContext'

interface Props {
  entryIds: Url[]
  onLoadMore: () => void
  renderEntry: (url: Url) => React.ReactElement
}

export const GoodNewsList: React.FC<Props> = memo((props) => {
  const { t } = useTranslation()
  const { entryIds, onLoadMore, renderEntry } = props

  const infiniteScrollWrapRef = useRef<HTMLDivElement>(null)
  const infiniteScrollObserveRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observeEl = infiniteScrollObserveRef.current
    const observer = new IntersectionObserver(
      (e) => {
        onLoadMore()
        //if (e[0].isIntersecting && !loading && !noMore) {
        //  onLoadMore()
        //}
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
  }, [infiniteScrollWrapRef, infiniteScrollObserveRef, onLoadMore])

  return (
    <Row className="mt-2 mb-2">
      <input type="hidden" name="entryIds" value={entryIds} />
      <Col>
        <div className="wrap">
          <div className="scroll" ref={infiniteScrollWrapRef}>
            {entryIds.length == 0 && <div className="text-muted text-center p-2">{t('no_info')}</div>}
            {entryIds.map(renderEntry)}
            <div ref={infiniteScrollObserveRef} className="scroll-observe" />
          </div>
        </div>
        <style jsx>{`
          .wrap {
            height: 100px;
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
    </Row>
  )
})
GoodNewsList.displayName = 'GoodNewsList'
