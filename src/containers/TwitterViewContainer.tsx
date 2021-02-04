import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { TopicSearchForm } from '@src/components/TopicSearchForm'
import { TwitterCardContainer } from '@src/containers/TwitterCardContainer'

export const TwitterViewContainer = () => {
    return (
        <Container className="mt-2 mb-2">
            <Row>
                <Col>
                    <TopicSearchForm />
                </Col>
            </Row>
            <Row>
                <TwitterCardContainer />
            </Row>
        </Container>
    )
}

