import { useDispatch, useSelector } from 'react-redux'
import { memo, useCallback } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { selectViewMode } from '@src/redux/ui'
import { RootState } from '@src/redux'
import { selectActive } from '@src/redux/regionsTopics'
import { loadMoreGoodNews } from '@src/redux/asyncActions'
import { useTranslation } from '@src/context/LanguageContext'
import { GoodNewsList } from '@src/presenters/GoodNewsList'
import { GoodNewsEntryContainer } from '@src/containers/GoodNewsEntryContainer'
import { selectGoodNewsEntries } from '@src/redux/globalSelectors'

export const GoodNewsListContainer: React.FC = memo(() => {
  const { lang } = useTranslation()
  const dispatch = useDispatch()
  const { byId } = useSelector((s: RootState) => selectGoodNewsEntries(s))
  const allIds = Object.keys(byId)
  const viewMode = useSelector(selectViewMode)
  const { region: activeRegion, topic: activeTopic } = useSelector(selectActive)
  const region = viewMode == 'region' ? activeRegion : ''
  const topic = viewMode == 'topic' ? activeTopic : ''

  const handleLoadMore = useCallback(() => {
    dispatch(loadMoreGoodNews({ region, topic, lang }))
  }, [region, topic, dispatch, lang])

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
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/GoodNewsLogo.svg`} height="24px"  alt='good news'/>
          </Col>
          <Col className="col-sm-11"/>
        </Row>
        <GoodNewsList entryIds={allIds} onLoadMore={handleLoadMore} renderEntry={renderEntry} />
      </Container>
    </div>
  )
})
GoodNewsListContainer.displayName = 'GoodNewsListContainer'
