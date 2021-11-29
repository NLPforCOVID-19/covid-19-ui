import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Layout } from '@src/components/Layout'
import { languagePaths } from '@src/utils'
import { Lang } from '@src/types'
import { defaultLang } from '@src/translations'

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
            <Card.Img
              variant="top"
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/topic-view.png`}
              alt="カテゴリビュー"
            />
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
            <Card.Img
              variant="top"
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/region-view.png`}
              alt="地域ビュー"
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <section>
      <ul>
        <li>ポジティブな記事(GOOD NEWS): 感情分析によってポジティブと自動判定された記事</li>
        <li>デマ関連情報: デマの可能性がある情報について言及していると自動判定された記事</li>
      </ul>
    </section>
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
      This site shows articles about COVID-19, which were crawled from official websites and news sites around the
      world. Articles are grouped by regions and categories.
    </p>
    <Row>
      <Col md="12" lg="6" className="d-flex">
        <Card className="mb-3 flex-fill">
          <Card.Body className="p-2">
            <Card.Title className="mb-1">1. Category view</Card.Title>
            <Card.Text>
              By default, you can choose one of the categories like &quot;Current state of infection&quot;,
              &quot;Prevention and mitigation measures&quot; with the tabs above. Articles are categorized automatically
              at first, then sequentially verified manually. In addition, articles are evaluated and tagged as positive.
            </Card.Text>
            <Card.Img
              variant="top"
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/topic-view_en.png`}
              alt="category view"
            />
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
            <Card.Img
              variant="top"
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/region-view_en.png`}
              alt="region view"
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <section>
      <ul>
        <li>Positive article (GOOD NEWS): An article automatically judged to be positive by sentiment analysis</li>
        <li>Disputable: An article automatically judged as referring to disputable information</li>
      </ul>
    </section>
    <section>
      <h5>FAQ</h5>
      <h6 className="question">Q. Cannot translate with Google Translate</h6>
      <p className="desc">
        A. Some sites cannot be translated by Google Translate website. If you use Google Chrome, you may be able to
        translate such sites by using the built-in translation tool of the browser. First, click on the link (
        <span className="material-icons open-in-new">open_in_new</span>) next to the title of the article that you want
        to translate. This will open the article from the original website. Then a translation tool dialog box should
        appear automatically and ask whether Chrome can translate the page or not. In case that the translation tool
        dialog box does not appear, make sure to enable Chrome&apos;s translation tool from the Settings &gt; Advanced
        &gt; Languages section.
      </p>
    </section>
  </Container>
)

const ContentTranslations: React.FC<{ lang: Lang }> = ({ lang }) => {
  switch (lang) {
    case 'ja':
      return <AboutJp />
    case 'en':
      return <AboutEn />
    default:
      return <AboutJp />
  }
}

interface Props {
  lang: Lang
}
const About: NextPage<Props> = ({ lang }) => {
  return (
    <Layout>
      <ContentTranslations lang={lang} />
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
type Query = {
  lang: Lang
}
export const getStaticProps: GetStaticProps<Props, Query> = async (ctx) => {
  const lang = ctx.params?.lang || defaultLang
  return {
    props: {
      lang
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: languagePaths,
    fallback: false
  }
}

export default About
