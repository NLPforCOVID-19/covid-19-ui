import { useMemo } from 'react'

interface Tag {
  type: 'text' | 'em'
  content: string
}
const parseTextWithTags = (text: string): Tag[] => {
  const result: Tag[] = []
  const [firstText, ...afterEmBeginTags] = text.split('<em>')
  result.push({ type: 'text', content: firstText })
  for (const afterEmBeginTag of afterEmBeginTags) {
    const [emTagTextContent, textOutOfEmTag] = afterEmBeginTag.split('</em>')
    result.push({ type: 'em', content: emTagTextContent }, { type: 'text', content: textOutOfEmTag })
  }
  return result
}

interface Props {
  /**
   * snippet: text includes <em> tags
   */
  snippet: string
  query: string
}

const TagRenderer: React.FC<{ tag: Tag }> = ({ tag }) => {
  switch (tag.type) {
    case 'em':
      return <mark>{tag.content}</mark>
    case 'text':
    default:
      return <>{tag.content}</>
  }
}

export const SnippetHighlighter: React.FC<Props> = ({ snippet, query }) => {
  const parsedSnippet = useMemo(() => parseTextWithTags(snippet), [snippet])
  return (
    <>
      {parsedSnippet.map((tag, i) => (
        <TagRenderer key={i} tag={tag} />
      ))}
    </>
  )
}
