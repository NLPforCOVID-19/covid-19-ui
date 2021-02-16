import { useSelector } from 'react-redux'
import { memo, useCallback, useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { selectActive, selectRegions, selectTopics, setActiveRegion, setActiveTopic } from '@src/redux/regionsTopics'
import { selectViewMode, selectFocusedToSearch } from '@src/redux/ui'
import { useTranslation } from '@src/context/LanguageContext'
import { Loading } from '@src/components/Loading'
import { searchForAllRegion } from '@src/redux/asyncActions'
import { selectCurrentQuery } from '@src/redux/search'
import { TwitterCardContainer } from '@src/containers/TwitterCardContainer'

export const TwitterViewContainer = () => {
    const { lang, t } = useTranslation()
    const topics = useSelector(selectTopics)
    const regions = useSelector(selectRegions)
    const { region: activeRegion, topic: activeTopic } = useSelector(selectActive)
    const viewMode = useSelector(selectViewMode)
    const currentQuery = useSelector(selectCurrentQuery)
    const isFocusedToSearch = useSelector(selectFocusedToSearch)

    const regionNames = useMemo(() => regions.allIds.map((rId) => regions.byId[rId].name), [regions])
    if (viewMode === 'region' || viewMode === 'topic') {
        return (
            <Container className="mt-2 mb-2">
                <Row>
                    <TwitterCardContainer region={activeRegion} topic={activeTopic} />
                </Row>
            </Container>
        )
    }
    return (
        <Container className="text-center">
            <Loading />
        </Container>
    )
}
TwitterViewContainer.displayName = 'TwitterViewsContainer'

