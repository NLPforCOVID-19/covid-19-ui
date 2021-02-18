import { memo, useCallback, useMemo } from 'react'
import dayjs from 'dayjs'
// import { useDispatch, useSelector } from 'react-redux'
// 
import { TwitterEntry, TwitterEntryWithSearchSnippet, RegionId, Topic } from '@src/types'
import { TwitterEntryView } from '@src/presenters/TwitterEntryView'
import { useTranslation } from '@src/context/LanguageContext'
// import * as Icon from '@src/components/Icons'
// import { selectEditMode, startEdit } from '@src/redux/ui'
// import { mainAltUrl } from '@src/utils'
// import { SnippetTagRenderer } from '@src/presenters/SnippetTagRenderer'

interface Props {
  entry: TwitterEntryWithSearchSnippet | TwitterEntry
  topic: Topic
  regionId: RegionId
}

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

export const TwitterEntryContainer: React.FC<Props> = memo(({ entry, topic, regionId }) => {
    // Temporary to simulate fake data.
    console.log(`TwitterEntryContainer entry=${entry} topic=${topic} regionId=${regionId}`)
    const i = Math.floor(Math.random() * data.length)
    entry = data[i]

  const { lang, t } = useTranslation()
  // const dispatch = useDispatch()
  // const editMode = useSelector(selectEditMode)

  const shortTimestamp = useMemo(() => dayjs(entry.timestamp).format('MM/DD HH:mm'), [entry.timestamp])

  // const renderSnippet = useCallback(() => {
  //   if (entry.kind === 'Entry') {
  //     return <>{entry.snippets[topic]}</>
  //   }
  //   if (entry.kind === 'EntryWithSearchSnippet') {
  //     return (
  //       <>
  //         {entry.searchSnippet.map((tag, i) => (
  //           <SnippetTagRenderer key={i} tag={tag} />
  //         ))}
  //       </>
  //     )
  //   }
  //   return entry
  // }, [topic, entry])

  return (
    <TwitterEntryView
       id={entry.id}
       name={entry.name}
       username={entry.username}
       verified={entry.verified}
       avatar={entry.avatar}
       contentOrig={entry.contentOrig}
       contentTrans={entry.contentTrans}
       timestamp={shortTimestamp}
    />
  )
})
TwitterEntryContainer.displayName = 'TwitterEntryContainer'

