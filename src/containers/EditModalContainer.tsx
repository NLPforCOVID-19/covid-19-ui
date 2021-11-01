import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import { cancelEdit, selectEditEntry } from '@src/redux/ui'
import { EditModal } from '@src/presenters/EditModal'
import { fetchHistory, modifyRegionCategory } from '@src/api'
import { EditHistory, Entry, EntryFlagsEdit, EntryWithSearchSnippet, SubmitState, Topic } from '@src/types'
import { makeTranslatedUrl } from '@src/utils'
import { EditHistoryView } from '@src/presenters/EditHisoryView'

interface EditHistoryError extends EditHistory {
  state: SubmitState
}

export interface EditFormState {
  password: string
  notes: string
  country: string
  flags: EntryFlagsEdit
  topics: Topic[]
}

export type EditFormAction =
  | { type: 'notes' | 'password'; payload: string }
  | { type: keyof EntryFlagsEdit; payload: boolean }
  | { type: 'country'; payload: string }
  | { type: 'topics'; payload: { topic: Topic; checked: boolean } }
  | { type: 'reset'; payload: Entry | EntryWithSearchSnippet | null }

const initializeFormState = (e: Entry | EntryWithSearchSnippet | null): EditFormState => {
  const state: EditFormState = {
    password: '',
    notes: '',
    country: '',
    flags: { aboutCovid: true, hidden: false, aboutRumor: false, useful: false, positive: true },
    topics: []
  }
  if (e === null) return state
  return {
    ...state,
    country: e.country,
    flags: { ...state.flags, ...e.flags },
    topics: Object.keys(e.snippets)
  }
}

const formReducer = (state: EditFormState, action: EditFormAction): EditFormState => {
  switch (action.type) {
    case 'notes':
      return { ...state, notes: action.payload }
    case 'password':
      return { ...state, password: action.payload }
    case 'country':
      return { ...state, country: action.payload }
    case 'topics': {
      const { topic, checked } = action.payload
      const topicSet = new Set(state.topics)
      checked ? topicSet.add(topic) : topicSet.delete(topic)
      return { ...state, topics: [...topicSet] }
    }
    case 'aboutCovid':
    case 'aboutRumor':
    case 'hidden':
    case 'useful':
    case 'positive':
      return {
        ...state,
        flags: {
          ...state.flags,
          [action.type]: action.payload
        }
      }
    case 'reset':
      return initializeFormState(action.payload)
  }
}

const makeUrls = (url: string): { text: string; url: string }[] => {
  return [
    { text: 'Original Url', url: url },
    { text: 'Translate to Japanese', url: makeTranslatedUrl(url, 'ja') },
    { text: 'Translate to English', url: makeTranslatedUrl(url, 'en') }
  ]
}

export const EditModalContainer: React.FC = () => {
  const editEntry = useSelector(selectEditEntry)
  const dispatch = useDispatch()
  const handleHide = useCallback(() => {
    dispatch(cancelEdit())
  }, [dispatch])

  // FormState
  const [formState, dispatchFormState] = useReducer(formReducer, editEntry, initializeFormState)
  useEffect(() => {
    dispatchFormState({ type: 'reset', payload: editEntry })
  }, [editEntry])

  // History
  const [history, setHistory] = useState<EditHistoryError>({
    checked: false,
    timestamp: 0,
    notes: '',
    state: 'fulfilled'
  })
  useEffect(() => {
    if (editEntry === null) return
    setHistory((s) => ({ ...s, state: 'pending' }))
    fetchHistory(editEntry.url)
      .then((h) => setHistory({ ...h, state: 'fulfilled' }))
      .catch(() => setHistory((s) => ({ ...s, state: 'rejected' })))
  }, [editEntry])
  const renderHistory = useCallback(() => <EditHistoryView {...history} />, [history])

  const urls = useMemo(() => (editEntry !== null ? makeUrls(editEntry.url) : []), [editEntry])

  // Submit
  const [submitState, setSubmitState] = useState<SubmitState>('fulfilled')
  const handleSubmit = useCallback(() => {
    if (editEntry === null) return
    setSubmitState('pending')
    modifyRegionCategory(editEntry.url, formState)
      .then(() => {
        setSubmitState('fulfilled')
        handleHide()
      })
      .catch(() => {
        setSubmitState('rejected')
        setTimeout(() => {
          setSubmitState('fulfilled')
        }, 3000)
      })
  }, [editEntry, formState, handleHide])

  return (
    <Modal show={editEntry !== null} onHide={handleHide} size="lg">
      {editEntry !== null ? (
        <EditModal
          onSubmit={handleSubmit}
          submitStatus={submitState}
          onHide={handleHide}
          title={editEntry.title}
          urls={urls}
          snippets={editEntry.snippets}
          state={formState}
          dispatch={dispatchFormState}
          country={editEntry.country}
          renderHistory={renderHistory}
        />
      ) : null}
    </Modal>
  )
}
