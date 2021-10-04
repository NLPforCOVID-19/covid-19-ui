import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as Icons from '@src/components/Icons'
import { GoodNewsEntryView } from '@src/presenters/GoodNewsEntryView'

export const GoodNewsList = () => {
  return (
    <Row className="mt-2 mb-2">
      <Col>
        <div className="wrap">
          <div className="scroll">
            <GoodNewsEntryView title="庭駅ナサ場対先メツロモ中化亮影トぞ多防ヘ陣社どぽれご岡世にト栄事都いどゆそ北空シ府升忍曇椎ほふスち。" mainUrl="" altUrl="" date="10/29" sourceName="Yahoo!" sourceUrl="" country="日本" renderIcon="" mark=""/>
            <GoodNewsEntryView title="米ね開心レロエソ格数ナヘ壮5日トメ政声ちこ的無笑ぎいべ険能フヤ死難あや需歩マ美盗婦きび第票ユスネ親惑償そ。" mainUrl="" altUrl="test" date="10/29" sourceName="中国政府" sourceUrl="" country="中国" renderIcon="" mark=""/>
            <GoodNewsEntryView title="用残ヤカハ季9括クス載欲ト初再資一スぐ利8更質カナヱマ性配イ景買非こえ。" mainUrl="" altUrl="test" date="10/29" sourceName="中国政府" sourceUrl="" country="中国" renderIcon="" mark=""/>
            <GoodNewsEntryView title="庭駅ナサ場対先メツロモ中化亮影トぞ多防ヘ陣社どぽれご岡世にト栄事都いどゆそ北空シ府升忍曇椎ほふスち。" mainUrl="" altUrl="test" date="10/29" sourceName="Yahoo!" sourceUrl="" country="日本" renderIcon="" mark=""/>
            <GoodNewsEntryView title="米ね開心レロエソ格数ナヘ壮5日トメ政声ちこ的無笑ぎいべ険能フヤ死難あや需歩マ美盗婦きび第票ユスネ親惑償そ。" mainUrl="" altUrl="test" date="10/29" sourceName="中国政府" sourceUrl="" country="中国" renderIcon="" mark=""/>
            <div className="scroll-observe" />
          </div>
        </div>
        <style jsx>{`
          .wrap {
            height: 100px;
            display: flex;
            flex-flow: column nowrap;
          }
          .header {
            font-size: 1.3rem;
          }
          .scroll {
            overflow-y: auto;
          }
          .scroll-observe {
            height: 1px;
          }
        `}</style>
      </Col>
    </Row>
  )
}
GoodNewsList.displayName = 'GoodNewsList'
