import React, { memo } from 'react'
import { toast } from 'react-hot-toast'

import { TweetId } from '@src/types'
import { useTranslation } from '@src/context/LanguageContext'

const notify = (msg: string) => toast(msg)

const twitterBaseUrl = 'https://twitter.com'

interface TweetHeaderProps {
  avatar: string
  name: string
  status: TweetId
  username: string
  verified: boolean
}
const TweetHeader: React.FC<TweetHeaderProps> = memo(({ avatar, name, status, username, verified }) => {
  return (
    <div className="tweet-header">
      <TweetAvatar href={avatar} username={username} />
      <TweetNames name={name} username={username} verified={verified} />
      <TweetTwitterLogo username={username} status={status} />
    </div>
  )
})
TweetHeader.displayName = 'TweetHeader'

interface TweetAvatarProps {
  username: string
  href: string
}
const TweetAvatar: React.FC<TweetAvatarProps> = memo(({ href, username }) => {
  return (
    <div className="tweet-avatar">
      <a href={twitterBaseUrl + '/' + username} target="_blank" rel="noreferrer">
        <img className="tweet-avatar-img" src={href} />
      </a>
    </div>
  )
})
TweetAvatar.displayName = 'TweetAvatar'

interface TweetNamesProps {
  name: string
  username: string
  verified: boolean
}
const TweetNames: React.FC<TweetNamesProps> = memo(({ name, username, verified }) => {
  return (
    <div className="tweet-names">
      <TweetName value={name} verified={verified} username={username} />
      <TweetUsername value={username} />
    </div>
  )
})
TweetNames.displayName = 'TweetNames'

interface TweetVerifBadgeProps {
  username: string
}
const TweetVerifBadge: React.FC<TweetVerifBadgeProps> = memo(({ username }) => {
  return (
    <div className="tweet-twitter-verif-badge">
      <a
        href={twitterBaseUrl + '/' + username}
        className="tweet-twitter-verif-badge-link"
        target="_blank"
        rel="noreferrer"
      >
        <svg viewBox="0 0 24 24" className="tweet-twitter-verif-badge-logo">
          <g>
            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
          </g>
        </svg>
      </a>
    </div>
  )
})
TweetVerifBadge.displayName = 'TweetVerifBadge'

interface TweetNameProps {
  username: string
  value: string
  verified: boolean
}
const TweetName: React.FC<TweetNameProps> = memo(({ username, value, verified }) => {
  return (
    <div className="tweet-name">
      <span>
        <a href={twitterBaseUrl + '/' + username} target="_blank" rel="noreferrer">
          {value}
        </a>
      </span>
      {verified && <TweetVerifBadge username={username} />}
    </div>
  )
})
TweetName.displayName = 'TweetName'

interface TweetUsernameProps {
  value: string
}
const TweetUsername: React.FC<TweetUsernameProps> = memo(({ value }) => {
  return (
    <div className="tweet-username">
      <span>
        <a href={twitterBaseUrl + '/' + value} target="_blank" rel="noreferrer">
          @{value}
        </a>
      </span>
    </div>
  )
})
TweetUsername.displayName = 'TweetUsername'

interface TweetTwitterLogoProps {
  status: TweetId
  username: string
}
const TweetTwitterLogo: React.FC<TweetTwitterLogoProps> = memo(({ status, username }) => {
  return (
    <div className="tweet-twitter-logo">
      <a
        href={twitterBaseUrl + '/' + username + '/status/' + status}
        className="tweet-twitter-logo-link"
        target="_blank"
        rel="noreferrer"
      >
        <svg viewBox="0 0 24 24" className="tweet-twitter-logo">
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
      </a>
    </div>
  )
})
TweetTwitterLogo.displayName = 'TweetTwitterLogo'

interface TweetBodyProps {
  msgorig: string
  msgtrans: string
}
const TweetBody: React.FC<TweetBodyProps> = memo(({ msgorig, msgtrans }) => {
  const { t } = useTranslation()
  return (
    <div className="tweet-body">
      <div className="tweet-message-original">
        <span>{msgorig}</span>
      </div>
      {msgtrans && (
        <div className="tweet-message-translation">
          <span className="tweet-translation-header">{t('translation')}:</span>
          <br />
          <span>{msgtrans}</span>
        </div>
      )}
    </div>
  )
})
TweetBody.displayName = 'TweetBody'

interface TweetTimestampProps {
  value: string
}
const TweetTimestamp: React.FC<TweetTimestampProps> = memo(({ value }) => {
  return (
    <div className="tweet-timestamp">
      <span>{value}</span>
    </div>
  )
})
TweetTimestamp.displayName = 'TweetTimestamp'

interface TweetTwitterActionReplyProps {
  status: TweetId
}
const TweetTwitterActionReply: React.FC<TweetTwitterActionReplyProps> = memo(({ status }) => {
  return (
    <div className="tweet-twitter-action tweet-twitter-action-reply">
      <a
        href={twitterBaseUrl + '/intent/tweet?in_reply_to=' + status}
        className="tweet-twitter-action-reply-link"
        target="_blank"
        rel="noreferrer"
      >
        <svg viewBox="0 0 24 24" className="tweet-twitter-action-reply-logo">
          <g>
            <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
          </g>
        </svg>
      </a>
    </div>
  )
})
TweetTwitterActionReply.displayName = 'TweetTwitterActionReply'

interface TweetTwitterActionRetweetProps {
  retweetCount: number
  status: TweetId
}
const TweetTwitterActionRetweet: React.FC<TweetTwitterActionRetweetProps> = memo(({ retweetCount, status }) => {
  const retweetCountElement = retweetCount == 0 ? '' : `  ~${retweetCount}`
  return (
    <div className="tweet-twitter-action tweet-twitter-action-retweet">
      <a
        href={twitterBaseUrl + '/intent/retweet?tweet_id=' + status}
        className="tweet-twitter-action-retweet-link"
        target="_blank"
        rel="noreferrer"
      >
        <svg viewBox="0 0 24 24" className="tweet-twitter-action-retweet-logo">
          <g>
            <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
          </g>
        </svg>
        <span>{retweetCountElement}</span>
      </a>
    </div>
  )
})
TweetTwitterActionRetweet.displayName = 'TweetTwitterActionRetweet'

interface TweetTwitterActionCopyLinkProps {
  status: TweetId
  username: string
}
const TweetTwitterActionCopyLink: React.FC<TweetTwitterActionCopyLinkProps> = memo(({ status, username }) => {
  const { t } = useTranslation()
  const handleClick = function (e: React.MouseEvent) {
    e.preventDefault()
    const link = `${twitterBaseUrl}/${username}/status/${status}`
    navigator.clipboard.writeText(link).then(
      () => {
        notify(t('twitter_link_saved_to_clipboard'))
      },
      () => {
        notify(t('twitter_link_not_saved_to_clipboard'))
      }
    )
  }
  return (
    <div className="tweet-twitter-action tweet-twitter-action-retweet">
      <a href="#" className="tweet-twitter-action-retweet-link" target="_blank" onClick={handleClick}>
        <svg viewBox="0 0 24 24" className="tweet-twitter-action-retweet-logo">
          <g>
            <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
            <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
          </g>
        </svg>
      </a>
    </div>
  )
})
TweetTwitterActionCopyLink.displayName = 'TweetTwitterActionCopyLink'

interface TweetTwitterActionLikeProps {
  status: TweetId
}
const TweetTwitterActionLike: React.FC<TweetTwitterActionLikeProps> = memo(({ status }) => {
  return (
    <div className="tweet-twitter-action tweet-twitter-action-like">
      <a
        href={twitterBaseUrl + '/intent/like?tweet_id=' + status}
        className="tweet-twitter-action-like-link"
        target="_blank"
        rel="noreferrer"
      >
        <svg viewBox="0 0 24 24" className="tweet-twitter-action-like-logo">
          <g>
            <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
          </g>
        </svg>
      </a>
    </div>
  )
})
TweetTwitterActionLike.displayName = 'TweetTwitterActionLike'

interface TweetFooterProps {
  retweetCount: number
  status: TweetId
  timestamp: string
  username: string
}
const TweetFooter: React.FC<TweetFooterProps> = memo(({ retweetCount, status, timestamp, username }) => {
  return (
    <div className="tweet-footer">
      <TweetTwitterActionReply status={status} />
      <TweetTwitterActionRetweet status={status} retweetCount={retweetCount} />
      <TweetTwitterActionLike status={status} />
      <TweetTwitterActionCopyLink status={status} username={username} />
      <TweetTimestamp value={timestamp} />
    </div>
  )
})
TweetFooter.displayName = 'TweetFooter'

interface Props {
  id: TweetId
  name: string
  username: string
  verified: boolean
  avatar: string
  contentOrig: string
  contentTrans: string
  timestamp: string
  retweetCount: number
}
export const TwitterEntryView: React.FC<Props> = memo((props) => {
  const { id, name, username, verified, avatar, contentOrig, contentTrans, timestamp, retweetCount } = props
  return (
    <div className="tweet-card mb-2 small text-secondary border rounded mr-2">
      <article role="tweet-article" className="tweet-article">
        <TweetHeader name={name} username={username} verified={verified} avatar={avatar} status={id} />
        <TweetBody msgorig={contentOrig} msgtrans={contentTrans} />
        <TweetFooter timestamp={timestamp} status={id} retweetCount={retweetCount} username={username} />
      </article>
    </div>
  )
})
TwitterEntryView.displayName = 'TwitterEntryView'
