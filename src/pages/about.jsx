import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Layout from '@src/components/Layout'

export default () => {
  return (
    <Layout>
      <Container className="p-3">
        <div className="back-link-wrap">
          <Link href="./">
            <a className="text-secondary">トップページに戻る</a>
          </Link>
        </div>
        <h3>このサイトの使い方</h3>
        <p>
          このサイトは、新型コロナウイルス感染症に関する世界各地域の公式サイトやニュースをクロールし、国・地域×カテゴリで集約、提示しています。
        </p>
        <section>
          <h4>(1) トップページ</h4>
          <p className="desc">
            トップページでは、カテゴリを選んで、世界の国々の情報を一覧することができます。
            カテゴリには「感染状況」「予防・緊急事態宣言」などがあり、ボタンをクリックすることで切り替えられます。
            <br />
            カテゴリはまず自動で分類し、順次、人手で検証しています。
          </p>
          <div className="img-wrap">
            <img src={`${process.env.BASE_PATH}/images/top.png`} width="100%" alt="トップページ" />
          </div>
        </section>
        <section>
          <h4>(2) 国別のページ</h4>
          <p className="desc">
            トップページで国名をクリックすると、国別のページに移動します。
            国別のページでは、その国の全カテゴリの情報を一覧できます。
          </p>
          <div className="img-wrap">
            <img src={`${process.env.BASE_PATH}/images/japan.png`} width="100%" alt="日本のページ" />
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
