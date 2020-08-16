import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Layout from '@src/components/Layout'
import React from 'react'
import { languagePaths } from '../../utils'

const AboutJp = () => (
  <Container className="p-3 text-dark">
    <h5>このサイトの使い方</h5>
    <p>
      このサイトは、COVID-19（新型コロナウイルス感染症）に関する世界各地域の公式サイトやニュースをクロールし、国・地域 ×
      カテゴリで集約、提示しています。
    </p>
    <Row>
      <Col md="12" lg="6" className="d-flex">
        <Card className="mb-3 flex-fill">
          <Card.Body className="p-2">
            <Card.Title className="mb-1">1. カテゴリビュー</Card.Title>
            <Card.Text>
              デフォルトでは、上側のタブでカテゴリを選んで、世界の情報を一覧することができます。
              カテゴリは「感染状況」「予防・緊急事態宣言」などの6つです。
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
        A. 現在の Google 翻訳の仕様上、翻訳できないサイトがあります。 Google Chrome
        を利用の方は、標準搭載の翻訳ツールを使うことで翻訳できる場合があります。 まず、タイトルの横にあるリンク（
        <span className="material-icons open-in-new">open_in_new</span>）から元のページを開いてください。
        ページを開くと翻訳ツールのダイアログが表示されるので、日本語を選択してください。
        ダイアログが表示されない方は、設定&gt;詳細設定&gt;言語から、「母国語以外のページで翻訳ツールを表示する」を有効にしてください。
      </p>
    </section>
  </Container>
)

const AboutEn = () => (
  <Container className="p-3 text-dark">
    <h5>How to use this website</h5>
    <p>
      This site shows articles about COVID-19, which crawled from official websites and news sites around the world.
      Each article is grouped by its region and category.
    </p>
    <Row>
      <Col md="12" lg="6" className="d-flex">
        <Card className="mb-3 flex-fill">
          <Card.Body className="p-2">
            <Card.Title className="mb-1">1. Category view</Card.Title>
            <Card.Text>
              By default, you can choose one of the categories like &quot;感染状況&quot;, &quot;予防・緊急事態宣言&quot;
              {/* TODO: カテゴリ名の翻訳 */}
              with the tabs above. Articles are categorized automatically at first, then sequentially verified manually.
              In addition, articles are checked if they are useful.
            </Card.Text>
            <Card.Img variant="top" src={`${process.env.BASE_PATH}/images/topic-view.png`} alt="category view" />
          </Card.Body>
        </Card>
      </Col>
      <Col md="12" lg="6" className="d-flex">
        <Card className="mb-3 flex-fill">
          <Card.Body className="p-2">
            <Card.Title className="mb-1">2. Region view</Card.Title>
            <Card.Text>
              Clicking on a region name will switch to a region-by-region view. In this view, you can list all
              categories of articles for the region.
            </Card.Text>
            <Card.Img variant="top" src={`${process.env.BASE_PATH}/images/region-view.png`} alt="region view" />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <section>
      <h5>FAQ</h5>
      <h6 className="question">Q. Cannot translate with Google Translate</h6>
      <p className="desc">
        A. Some sites cannot be translated by Google Translate. If you use Google Chrome, you may be able to translate
        such sites by using the translation tool. First, click on the link (
        <span className="material-icons open-in-new">open_in_new</span>) next to the title to open original website.
        Then translation tool dialog box will appear, and you can translate the site. Make sure translation tool is
        enabled on Settings &gt; Advanced &gt; Languages.
      </p>
    </section>
  </Container>
)

const ContentTranslations = {
  ja: AboutJp,
  en: AboutEn
}

const About = ({ lang }) => {
  const Content = ContentTranslations[lang]
  return (
    <Layout>
      <Content />
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
        .material-icons {
          font-size: 1em;
          vertical-align: middle;
        }
        .open-in-new {
          color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps(ctx) {
  const { lang } = ctx.params
  return {
    props: {
      lang
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: languagePaths,
    fallback: false
  }
}

export default About
