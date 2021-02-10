import { memo } from 'react'
import Col from 'react-bootstrap/Col'

const twitterBaseUrl = "https://twitter.com"

const TweetCard: React.DC<Props> = memo((props) => {
    return (
        <div className="tweet-card mb-2 small text-secondary border rounded mr-2">
            <article role="tweet-article" className="tweet-article">
                <TweetHeader name={props.name} username={props.username} verified={props.verified} avatar={props.avatar} status={props.status}/>
                <TweetBody msgorig={props.msgorig} msgtrans={props.msgtrans} />
                <TweetFooter timestamp={props.timestamp} />
            </article>
        </div>
    )
})

const TweetHeader: React.DC<Props> = memo((props) => {
    return (
        <div className="tweet-header">
            <TweetAvatar href={props.avatar} username={props.username} />
            <TweetNames name={props.name} username={props.username} verified={props.verified} />
            <TweetTwitterLogo username={props.username} status={props.status} />
        </div>
    )
})

const TweetAvatar: React.DC<Props> = memo((props) => {
    return (
        <div className="tweet-avatar">
            <a href={twitterBaseUrl + '/' + props.username} target="_blank">
                <img className="tweet-avatar-img" src={props.href}/>
            </a>
        </div>
    )
})

const TweetNames: React.DC<Props> = memo((props) => {
    return (
        <div className="tweet-names">
            <TweetName value={props.name} verified={props.verified} username={props.username} />
            <TweetUsername value={props.username} />
        </div>
    )
})

const TweetVerifBadge: React.DC<Props> = memo((props) => {
    return (
        <div className="tweet-twitter-verif-badge">
            <a href={twitterBaseUrl + '/' + props.username} className="tweet-twitter-verif-badge-link" target="_blank">
                <svg viewBox="0 0 24 24" className="tweet-twitter-verif-badge-logo"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>
            </a>
        </div>
    )
})

const TweetName: React.DC<Props> = memo((props) => {
    return (
        <div className="tweet-name">
            <span><a href={twitterBaseUrl + '/' + props.username} target="_blank">{props.value}</a></span>
            {props.verified &&
                <TweetVerifBadge username={props.username} />}
        </div>
    )
})

const TweetUsername: React.DC<Props> = memo((props) => {
    return (
        <div className="tweet-username">
            <span><a href={twitterBaseUrl + '/' + props.value} target="_blank">@{props.value}</a></span>
        </div>
    )
})

const TweetTwitterLogo: React.DC<Props> = memo((props) => {
    return (
        <div className="tweet-twitter-logo">
            <a href={twitterBaseUrl + '/' + props.username + '/status/' + props.status} className="tweet-twitter-logo-link" target="_blank">
                <svg viewBox="0 0 24 24" className="tweet-twitter-logo"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
            </a>
        </div>
    )
})

const TweetBody: React.DC<Props> = memo((props) => {
    return (
        <div className="tweet-body">
            <div className="tweet-message-original">
                <span>{props.msgorig}</span>
            </div>
            {props.msgtrans &&
                <div className="tweet-message-translation">
                    <span className="tweet-translation-header">Translation</span><br/>
                    <span>{props.msgtrans}</span>
                </div>}
        </div>
    )
})

const TweetTimestamp: React.FC<Props> = memo((props) => {
    return (
        <div className="tweet-timestamp">
            <span>{props.value}</span>
        </div>
    )
})

const TweetTwitterActionReply: React.FC<Props> = memo((props) => {
    return (
        <div className="tweet-twitter-action tweet-twitter-action-reply">
            <a href="" className="tweet-twitter-action-reply-link" target="_blank">
                <svg viewBox="0 0 24 24" className="tweet-twitter-action-reply-logo"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
            </a>
        </div>
    )
})

const TweetTwitterActionRetweet: React.FC<Props> = memo((props) => {
    return (
        <div className="tweet-twitter-action tweet-twitter-action-retweet">
            <a href="" className="tweet-twitter-action-retweet-link" target="_blank">
                <svg viewBox="0 0 24 24" className="tweet-twitter-action-retweet-logo"><g><path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path></g></svg>
            </a>
        </div>
    )
})

const TweetTwitterActionLike: React.FC<Props> = memo((props) => {
    return (
        <div className="tweet-twitter-action tweet-twitter-action-like">
            <a href="" className="tweet-twitter-action-like-link" target="_blank">
                <svg viewBox="0 0 24 24" className="tweet-twitter-action-like-logo"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
            </a>
        </div>
    )
})

const TweetFooter: React.FC<Props> = memo((props) => {
    return (
        <div className="tweet-footer">
            <TweetTwitterActionLike />
            <TweetTwitterActionRetweet />
            <TweetTwitterActionReply />
            <div className="tweet-filler">
            </div>
            <TweetTimestamp value={props.timestamp} />
        </div>
    )
})

export const Tweet = memo(() => {
    const data = [
        {
            id: '1357006259413635076',
            name: "nlpforcovid-19",
            verified: true,
            username: "nlpforcovid",
            avatar: "https://pbs.twimg.com/profile_images/1347024085952331778/3oBHXOOn_bigger.jpg",
            contentOrig: "欧州がより多くのワクチンを求めている（ヨーロッパ，経済・福祉政策のニュース，France 24",
            contentTrans: null,
            timestamp: "2021-02-10 14:45:03"
        },
        {
            id: '1001',
            name: "HDrachster",
            verified: false,
            username: "HDrachster",
            avatar: "https://pbs.twimg.com/profile_images/1474064923/Hendrik-Drachsler_klein_bigger.jpg",
            contentOrig: "Head of http://edutec.science cares about advancing educational technology, learning analytics, recommender systems, artificial intelligence & learning science",
            contentTrans: "http://edutec.scienceの責任者は、教育技術、学習分析、レコメンダーシステム、人工知能、学習科学の進歩に関心を持っています",
            timestamp: "2021-02-10 14:40:24"
        },
        {
            id: '1002',
            name: "NASA",
            verified: true,
            username: "NASA",
            avatar: "https://pbs.twimg.com/profile_images/1321163587679784960/0ZxKlEKB_normal.jpg",
            contentOrig: "Let's go to Mars!",
            contentTrans: "火星に行こう！",
            timestamp: "2021-02-10 14:39:56"
        },
        {
            id: '1003',
            name: "松本人志",
            verified: true,
            username: "matsu_bouzu",
            avatar: "https://pbs.twimg.com/profile_images/1274931784979906562/LBxVQhgd_bigger.jpg",
            contentOrig: "所属事務所：よしもとクリエイティブエージェンシー コンビ名：ダウンタウン 血液型：Ｂ型",
            contentTrans: null,
            timestamp: "2021-02-10 14:35:36"
        },
        {
            id: '1004',
            name: "LEARN Analytics Research",
            verified: true,
            username: "NYU_LEARN",
            avatar: "https://pbs.twimg.com/profile_images/963529222340964355/5ZWgf5Jt_bigger.jpg",
            contentOrig: "Network of teachers + technologists using data to promote effective, engaging + equitable education",
            contentTrans: "データを使用して効果的で魅力的な+公平な教育を促進する教師と技術者のネットワーク",
            timestamp: "2021-02-10 14:35:28"
        },
        {
            id: '1354968521143324672',
            name: "nlpforcovid-19",
            verified: true,
            username: "nlpforcovid",
            avatar: "https://pbs.twimg.com/profile_images/1347024085952331778/3oBHXOOn_bigger.jpg",
            contentOrig: "介護者のための質の悪いマスク?（ヨーロッパ，その他のニュース，Franceinfo）https://lotus.kuee.kyoto-u.ac.jp/NLPforCOVID-19",
            contentTrans: null,
            timestamp: "2021-02-10 14:29:29"
        }
    ]
    return (
        <div>
        {data.map((tweetData) => (
            <TweetCard key={tweetData.id} name={tweetData.name} username={tweetData.username} verified={tweetData.verified} avatar={tweetData.avatar}
                msgorig={tweetData.contentOrig} msgtrans={tweetData.contentTrans}
                status={tweetData.id}
                timestamp={tweetData.timestamp} />
        ))}
        </div>
    )
})


export const TwitterCard: React.FC<Props> = memo((props) => {
  // const { t } = useTranslation()
  // const { title, entryIds, loading, onClickTitle, noMore, onLoadMore, renderEntry, renderSubInfo } = props
  // const handleClickTitle = useCallback(
  //   (e: React.MouseEvent) => {
  //     e.preventDefault()
  //     onClickTitle()
  //   },
  //   [onClickTitle]
  // )

  // const infiniteScrollWrapRef = useRef<HTMLDivElement>(null)
  // const infiniteScrollObserveRef = useRef<HTMLDivElement>(null)
  // useEffect(() => {
  //   const observeEl = infiniteScrollObserveRef.current
  //   const observer = new IntersectionObserver(
  //     (e) => {
  //       if (e[0].isIntersecting && !loading && !noMore) {
  //         onLoadMore()
  //       }
  //     },
  //     { root: infiniteScrollWrapRef.current }
  //   )
  //   if (observeEl) {
  //     observer.observe(observeEl)
  //   }
  //   return () => {
  //     if (observeEl) {
  //       observer.unobserve(observeEl)
  //     }
  //   }
  // }, [infiniteScrollWrapRef, infiniteScrollObserveRef, loading, noMore, onLoadMore])

  return (
    <Col>
      <div className="wrap">
        <div className="scroll">
            <Tweet />
        </div>
      </div>
      <style jsx>{`
        .wrap {
          height: 410px;
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
  )
})
TwitterCard.displayName = 'TwitterCard'
