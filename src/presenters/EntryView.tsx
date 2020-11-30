interface Props {
  title: string
  mainUrl: string
  date: string
  sourceName: string
  sourceUrl: string
  snippet: string
  altUrl?: string
  mark?: string
  country?: string
}

export const EntryView: React.FC<Props> = (props) => {
  const { title, mainUrl, date, sourceName, sourceUrl, snippet, altUrl, mark, country } = props
  // TODO: Icon
  return (
    <div>
      <div>icon</div>
      <div>
        <div>
          <span>{date}</span>
          {country && <span>({country})</span>}
          {mark && <mark>{mark}</mark>}
          <a href={mainUrl}>{title}</a>
          {altUrl && <a href={altUrl}>orig</a>}
        </div>
        <div>
          <a href={sourceUrl}>{sourceName}</a>
        </div>
        <div>{snippet}</div>
      </div>
    </div>
  )
}
