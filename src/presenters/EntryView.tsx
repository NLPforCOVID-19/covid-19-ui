import { Entry } from '@src/types'

export const EntryView = ({ entry }: { entry: Entry }) => {
  return <div>{entry.title}</div>
}
