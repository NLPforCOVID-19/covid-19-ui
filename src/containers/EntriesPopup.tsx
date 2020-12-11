import { useSelector } from 'react-redux'
import { Popup } from 'react-map-gl'
import React, { useCallback } from 'react'

import { RootState } from '@src/redux'
import { Url } from '@src/types'
import { mainAltUrl } from '@src/utils'
import { useTranslation } from '@src/context/LanguageContext'
import * as Icons from '@src/components/Icons'

interface EntriesPopupProps {
  countryId: string
  entryIds: string[]
}

const countryPosition: Record<string, { longitude: number; latitude: number }> = {
  jp: { longitude: 140, latitude: 36 },
  fr: { longitude: 2.3522, latitude: 48.8566 }
}

export const EntriesPopup: React.FC<EntriesPopupProps> = ({ countryId, entryIds }) => {
  const { lang } = useTranslation()
  const byUrl = useSelector((s: RootState) => s.entries.byUrl)

  const renderEntry = useCallback(
    (id: Url) => {
      const { country, title, url } = byUrl[id]
      const { main, alt } = mainAltUrl(country, lang, url)
      return <ListItem key={id} title={title} url={main} altUrl={alt} />
    },
    [byUrl, lang]
  )

  if (!countryPosition[countryId]) {
    return null
  }
  const { latitude, longitude } = countryPosition[countryId]

  return (
    <Popup longitude={longitude} latitude={latitude} closeButton={false}>
      <ul className="wrap">{entryIds.map(renderEntry)}</ul>
      <style jsx>{`
        .wrap {
          max-width: 240px;
          padding-left: 1rem;
          margin: 0;
        }
      `}</style>
    </Popup>
  )
}

interface ListItemProps {
  title: string
  url: string
  altUrl?: string
}

export const ListItem: React.FC<ListItemProps> = ({ title, url, altUrl }) => {
  const { t } = useTranslation()
  return (
    <li className="small">
      <div className="wrap">
        <div className="item">
          <a href={url} target="_blank" rel="noreferrer" title={title}>
            {title}
          </a>
        </div>
        {altUrl && (
          <div>
            <a href={altUrl} target="_blank" rel="noreferrer" title={t('元の言語で表示')}>
              <Icons.OpenInNew />
            </a>
          </div>
        )}
      </div>
      <style jsx>{`
        .wrap {
          display: flex;
        }
        .item {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        //.item::before {
        //  content: '-';
        //  display: inline-block;
        //  padding-right: 1em;
        //}
      `}</style>
    </li>
  )
}
