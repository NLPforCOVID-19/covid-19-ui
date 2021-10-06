import { useDispatch, useSelector } from 'react-redux'
import { memo, useCallback } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { selectViewMode } from '@src/redux/ui'
import { selectRegions } from '@src/redux/regionsTopics'
import { loadMoreGoodNews } from '@src/redux/asyncActions'
import { useTranslation } from '@src/context/LanguageContext'
import { RegionId, Topic } from '@src/types'
import { GoodNewsList } from '@src/presenters/GoodNewsList'
import { GoodNewsEntryContainer } from '@src/containers/GoodNewsEntryContainer'
import { selectGoodNewsEntries } from '@src/redux/globalSelectors'

interface Props {
  region: RegionId
  topic: Topic
}

export const GoodNewsListContainer: React.FC<Props> = memo(() => {
  const { lang } = useTranslation()
  const dispatch = useDispatch()
  const { byId } = useSelector((s: RootState) => selectGoodNewsEntries(s))
  const allIds = Object.keys(byId)
  const viewMode = useSelector(selectViewMode)
  const regions = useSelector(selectRegions)

  const handleLoadMore = useCallback(() => {
    dispatch(loadMoreGoodNews({ lang }))
  }, [dispatch, lang])

  const renderEntry = useCallback(
    (url: string) => {
      return <GoodNewsEntryContainer key={url} entry={byId[url]} />
    },
    [byId]
  )

  return (
    <div className="mt-3">
      <Container className="rounded border wrap">
        <Row className="mt-2 mb-2">
          <Col className="col-sm-1">
            <img src="/images/GoodNewsLogo.svg" height="24px" />
            <input type="hidden" name="viewMode" value={viewMode} />
            <input type="hidden" name="regions" value={regions} />
          </Col>
          <Col className="col-sm-11"></Col>
        </Row>
        <GoodNewsList entryIds={allIds} onLoadMore={handleLoadMore} renderEntry={renderEntry} />
      </Container>
    </div>
  )
})
GoodNewsListContainer.displayName = 'GoodNewsListContainer'
