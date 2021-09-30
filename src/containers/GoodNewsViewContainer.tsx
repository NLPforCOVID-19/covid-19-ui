import { memo } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const GoodNewsViewContainer = memo(() => {
  return (
    <div className="mt-3">
      <Container className="rounded border wrap">
        <Row className="mt-2 mb-2">
          <Col className="col-sm-1">
            <img src="/images/GoodNewsLogo.svg" width="100%" />
          </Col>
          <Col className="col-sm-11"></Col>
        </Row>
        <Row className="m-3">
          [09/29]
          庭駅ナサ場対先メツロモ中化亮影トぞ多防ヘ陣社どぽれご岡世にト栄事都いどゆそ北空シ府升忍曇椎ほふスち。Yahoo!
          <br />
          [09/29]
          米ね開心レロエソ格数ナヘ壮5日トメ政声ちこ的無笑ぎいべ険能フヤ死難あや需歩マ美盗婦きび第票ユスネ親惑償そ。中国政府
          <br />
          [09/27] 用残ヤカハ季9括クス載欲ト初再資一スぐ利8更質カナヱマ性配イ景買非こえ。中国政府
          <br />
        </Row>
      </Container>
    </div>
  )
})
GoodNewsViewContainer.displayName = 'GoodNewsViewContainer'
