import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Layout from '@src/components/Layout'

export default () => {
  return (
    <Layout>
      <Container className="p-3">
        <div className="back-link-wrap">
          <Link href={`${process.env.BASE_PATH}/`}>
            <a className="text-secondary">トップページに戻る</a>
          </Link>
        </div>
        <h3>このサイトの使い方</h3>
        <p>
          このサイトは、COVID-19（新型コロナウイルス感染症）に関する世界各地域の公式サイトやニュースをクロールし、国・地域×カテゴリで集約、提示しています。
        </p>
        <section>
          <h4>(1) カテゴリビュー</h4>
          <p className="desc">
            デフォルトでは、上側のタブでカテゴリを選んで、世界の国々の情報を一覧することができます。 カテゴリは「感染状況」「予防・緊急事態宣言」などの6つです。
            <br />
            各記事のカテゴリはまず自動で分類し、順次、人手で検証しています。また、役立つ記事かどうかも人手で判断しています。
          </p>
          <div className="img-wrap">
            <img src={`${process.env.BASE_PATH}/images/topic-view.png`} width="100%" alt="トピックビュー" />
          </div>
        </section>
        <section>
          <h4>(2) 地域ビュー</h4>
          <p className="desc">
            地域名をクリックすると、地域別の表示に切り替わります。この表示では地域ごとに全カテゴリの情報を一覧できます。
            この画面でカテゴリ名をクリックすると、元のカテゴリビューに戻ります。
          </p>
          <div className="img-wrap">
            <img src={`${process.env.BASE_PATH}/images/region-view.png`} width="100%" alt="リージョンビュー" />
          </div>
        </section>
      </Container>
      <style jsx>{`
        .back-link-wrap {
          margin-bottom: 10px;
        }
        .img-wrap {
          max-width: 80%;
          margin: 10px auto;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
        section {
          padding: 20px 0;
        }
        .desc {
          padding-left: 20px;
        }
      `}</style>
    </Layout>
  )
}
