import { useSelector } from 'react-redux'
import { Popup } from 'react-map-gl'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import { RootState } from '@src/redux'
import { Url } from '@src/types'
import { mainAltUrl } from '@src/utils'
import { useTranslation } from '@src/context/LanguageContext'
import * as Icons from '@src/components/Icons'
import { selectFocusedToSearch } from '@src/redux/ui'

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
  za: { latitude: -33.925, longitude: 18.425 },
  id: { latitude: -6.2146, longitude: 106.8451 },
  gb: { latitude: 51.5072, longitude: -0.1275 }
}

export const EntriesPopup: React.FC<EntriesPopupProps> = memo(({ countryId, entryIds }) => {
  const { lang, t } = useTranslation()
  const byUrl = useSelector((s: RootState) => s.entries.byUrl)
  const byUrlSearch = useSelector((s: RootState) => s.search.byUrl)
  const isFocusedToSearch = useSelector(selectFocusedToSearch)

  const renderEntry = useCallback(
    (id: Url) => {
      const { country, title, url } = isFocusedToSearch ? byUrlSearch[id] : byUrl[id]
      const { main, alt } = mainAltUrl(country, lang, url)
      return <ListItem key={id} title={title} url={main} altUrl={alt} />
    },
    [byUrl, lang, isFocusedToSearch, byUrlSearch]
  )

  const popupRef = useRef<Popup>(null)
  const [initialZIndex, setInitialZIndex] = useState('')
  useEffect(() => {
    if (popupRef.current) {
      const container = popupRef.current._containerRef.current
      if (container) {
        setInitialZIndex(container.style.zIndex)
        const handleMouseEnter = () => {
          container.style.zIndex = '255'
        }
        const handleMouseLeave = () => {
          container.style.zIndex = initialZIndex
        }
        container.addEventListener('mouseenter', handleMouseEnter)
        container.addEventListener('mouseleave', handleMouseLeave)
        return () => {
          container.removeEventListener('mouseenter', handleMouseEnter)
          container.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, [initialZIndex])

  if (!countryPosition[countryId]) {
    return null
  }
  const { latitude, longitude } = countryPosition[countryId]

  return (
    <Popup longitude={longitude} latitude={latitude} closeButton={false} ref={popupRef}>
      <div className="country-name">{t(countryId)}</div>
      <ul className="wrap">{entryIds.map(renderEntry)}</ul>
      <style jsx>{`
        .country-name {
          font-size: 0.9rem;
          padding: 0 5px;
        }
        .wrap {
          max-width: 240px;
          padding-left: 1rem;
          margin: 0;
        }
      `}</style>
    </Popup>
  )
})
EntriesPopup.displayName = 'EntriesPopup'

interface ListItemProps {
  title: string
  url: string
  altUrl?: string
}

export const ListItem: React.FC<ListItemProps> = memo(({ title, url, altUrl }) => {
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
})
ListItem.displayName = 'ListItem'
