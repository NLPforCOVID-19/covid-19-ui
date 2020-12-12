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
  fr: { latitude: 48.8566, longitude: 2.3522 },
  es: { latitude: 40.4189, longitude: -3.6919 },
  de: { latitude: 52.5167, longitude: 13.3833 },
  kr: { latitude: 37.5833, longitude: 127.0 },
  in: { latitude: 28.7, longitude: 77.2 },
  np: { latitude: 27.7167, longitude: 85.3667 },
  my: { latitude: 3.1478, longitude: 101.6953 },
  sg: { latitude: 1.3, longitude: 103.8 },
  jp: { latitude: 35.6897, longitude: 139.6922 },
  cn: { latitude: 39.905, longitude: 116.3914 },
  us: { latitude: 38.9047, longitude: -77.0163 },
  br: { latitude: -15.7744, longitude: -48.0773 },
  au: { latitude: -35.2931, longitude: 149.1269 },
  za: { latitude: -33.925, longitude: 18.425 }
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
    <Popup longitude={longitude} latitude={latitude} closeButton={false} sortByDepth={true}>
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
