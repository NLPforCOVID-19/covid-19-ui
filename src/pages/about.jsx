import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Layout from '@src/components/Layout'

export default () => {
  return (
    <Layout>
      <Container className="p-3 text-dark">
        <h5>このサイトの使い方</h5>
        <p>
          このサイトは、COVID-19（新型コロナウイルス感染症）に関する世界各地域の公式サイトやニュースをクロールし、国・地域 × カテゴリで集約、提示しています。
        </p>
        <Row>
          <Col md="12" lg="6" className="d-flex">
            <Card className="mb-3 flex-fill">
              <Card.Body className="p-2">
                <Card.Title className="mb-1">1. カテゴリビュー</Card.Title>
                <Card.Text>
                  デフォルトでは、上側のタブでカテゴリを選んで、世界の情報を一覧することができます。 カテゴリは「感染状況」「予防・緊急事態宣言」などの6つです。
                  カテゴリはまず自動で分類し、順次、人手で検証しています。また、役立つ記事かどうかも人手で判断しています。
                </Card.Text>
                <Card.Img variant="top" src={`${process.env.BASE_PATH}/images/topic-view.png`} alt="カテゴリビュー" />
              </Card.Body>
            </Card>
          </Col>
          <Col md="12" lg="6" className="d-flex">
            <Card className="mb-3 flex-fill">
              <Card.Body className="p-2">
                <Card.Title className="mb-1">2. 地域ビュー</Card.Title>
                <Card.Text>
                  地域名をクリックすると、地域別の表示に切り替わります。この表示では地域ごとに全カテゴリの情報を一覧できます。
                  カテゴリ名をクリックするとカテゴリビューに戻ります。
                </Card.Text>
                <Card.Img variant="top" src={`${process.env.BASE_PATH}/images/region-view.png`} alt="地域ビュー" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <section>
          <h5>よくある質問</h5>
          <h6 className="question">Q. Google 翻訳で翻訳できない</h6>
          <p className="desc">
            A. 一部、Google 翻訳で翻訳できないサイトがあります。Google Chrome 等のブラウザの翻訳機能を使うと翻訳できる場合があります。
          </p>
        </section>
      </Container>
      <style jsx>{`  
        .back-link-wrap {
          margin-bottom: 10px;
        }
        .question {
          padding-left: 10px;
        }
        .desc {
          padding-left: 20px;
        }
      `}</style>
    </Layout>
  )
}
