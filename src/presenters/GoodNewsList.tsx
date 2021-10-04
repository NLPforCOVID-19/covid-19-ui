import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as Icons from '@src/components/Icons'

export const GoodNewsList = () => {
  return (
    <Row className="mt-2 mb-2">
      <Col>
        <div className="wrap">
          <div className="scroll">
            <div className="news">
                <div className="title text-info">
                    <span className="small text-muted">[10/29]</span>
                    <span className="small text-muted">&thinsp;(日本)</span>
                    <a href="" target="_blank" rel="noreferrer">&thinsp;庭駅ナサ場対先メツロモ中化亮影トぞ多防ヘ陣社どぽれご岡世にト栄事都いどゆそ北空シ府升忍曇椎ほふスち。</a>
                    <span className="source small">
                        <a href="" target="_blank" rel="noreferrer">&thinsp;Yahoo!</a>
                    </span>
                </div>
            </div>
            <div className="news">
                <div className="title text-info">
                    <span className="small text-muted">[10/29]</span>
                    <span className="small text-muted">&thinsp;(中国)</span>
                    <a href="" target="_blank" rel="noreferrer">&thinsp;米ね開心レロエソ格数ナヘ壮5日トメ政声ちこ的無笑ぎいべ険能フヤ死難あや需歩マ美盗婦きび第票ユスネ親惑償そ。</a>
                    <span>
                        <a href="" target="_blank" rel="noreferrer" title="">&thinsp;<Icons.OpenInNew /></a>
                    </span>
                    <span className="source small">
                        <a href="" target="_blank" rel="noreferrer">&thinsp;中国政府</a>
                    </span>
                </div>
            </div>
            <div className="news">
                <div className="title text-info">
                    <span className="small text-muted">[10/29]</span>
                    <span className="small text-muted">&thinsp;(中国)</span>
                    <a href="" target="_blank" rel="noreferrer">&thinsp;用残ヤカハ季9括クス載欲ト初再資一スぐ利8更質カナヱマ性配イ景買非こえ。</a>
                    <span>
                        <a href="" target="_blank" rel="noreferrer" title="">&thinsp;<Icons.OpenInNew /></a>
                    </span>
                    <span className="source small">
                        <a href="" target="_blank" rel="noreferrer">&thinsp;中国政府</a>
                    </span>
                </div>
            </div>
            <div className="news">
                <div className="title text-info">
                    <span className="small text-muted">[10/29]</span>
                    <span className="small text-muted">&thinsp;(日本)</span>
                    <a href="" target="_blank" rel="noreferrer">&thinsp;庭駅ナサ場対先メツロモ中化亮影トぞ多防ヘ陣社どぽれご岡世にト栄事都いどゆそ北空シ府升忍曇椎ほふスち。</a>
                    <span className="source small">
                        <a href="" target="_blank" rel="noreferrer">&thinsp;Yahoo!</a>
                    </span>
                </div>
            </div>
            <div className="news">
                <div className="title text-info">
                    <span className="small text-muted">[10/29]</span>
                    <span className="small text-muted">&thinsp;(中国)</span>
                    <a href="" target="_blank" rel="noreferrer">&thinsp;米ね開心レロエソ格数ナヘ壮5日トメ政声ちこ的無笑ぎいべ険能フヤ死難あや需歩マ美盗婦きび第票ユスネ親惑償そ。</a>
                    <span>
                        <a href="" target="_blank" rel="noreferrer" title="">&thinsp;<Icons.OpenInNew /></a>
                    </span>
                    <span className="source small">
                        <a href="" target="_blank" rel="noreferrer">&thinsp;中国政府</a>
                    </span>
                </div>
            </div>
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
