import { memo, useCallback, useMemo } from 'react'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'

import { Entry } from '@src/types'
import { GoodNewsEntryView } from '@src/presenters/GoodNewsEntryView'
import { useTranslation } from '@src/context/LanguageContext'
import * as Icon from '@src/components/Icons'
import { selectEditMode, startEdit } from '@src/redux/ui'
import { mainAltUrl } from '@src/utils'

interface Props {
  entry: Entry
}

export const GoodNewsEntryContainer: React.FC<Props> = memo(({ entry }) => {
  const { lang, t } = useTranslation()
  const dispatch = useDispatch()
  const editMode = useSelector(selectEditMode)

  const date = useMemo(() => dayjs(entry.timestamp).format('MM/DD'), [entry.timestamp])
  const { main, alt } = useMemo(() => mainAltUrl(entry.country, lang, entry.url), [entry.country, lang, entry.url])
  const countryDisplayName = useMemo(() => {
    return t(entry.country)
  }, [entry.country, t])

  const handleClickEdit = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      if (!editMode) return
      dispatch(startEdit(entry))
    },
    [editMode, dispatch, entry]
  )

  const renderIcon = useCallback(() => {
    return (
      <>
        {editMode && (
          <a href="#" onClick={handleClickEdit}>
            <Icon.Edit />
          </a>
        )}
      </>
    )
  }, [editMode, handleClickEdit])

  return (
    <GoodNewsEntryView
      title={entry.title}
      mainUrl={main}
      altUrl={alt}
      date={date}
      sourceName={entry.domainLabel}
      sourceUrl={entry.domainUrl}
      country={countryDisplayName}
      renderIcon={renderIcon}
    />
  )
})
GoodNewsEntryContainer.displayName = 'GoodNewsEntryContainer'
