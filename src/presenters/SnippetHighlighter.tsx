import { useMemo } from 'react'

interface Tag {
  type: 'text' | 'match' | 'exact-match'
  content: string
}
const parseTextWithTags = (text: string): Tag[] => {
  const result: Tag[] = []
  const [firstText, ...afterEmBeginTags] = text.split('<em>')
  if (firstText.length > 0) {
    result.push({ type: 'text', content: firstText })
  }
  for (const afterEmBeginTag of afterEmBeginTags) {
    const [emTagTextContent, textOutOfEmTag] = afterEmBeginTag.split('</em>')
    result.push({ type: 'match', content: emTagTextContent })
    if (textOutOfEmTag.length > 0) {
      result.push({ type: 'text', content: textOutOfEmTag })
    }
  }
  console.log(text, result)
  return result
}

const findExactMatch = (tags: Tag[], query: string): Tag[] => {
  const result = [] as Tag[]
  let buffer = [] as Tag[]
  for (const tag of tags) {
    switch (tag.type) {
      case 'match': {
        buffer.push(tag)
        const joined = buffer.map((tag) => tag.content).join('')
        if (joined === query) {
          result.push({ type: 'exact-match', content: query })
          buffer = []
        }
        break
      }
      case 'text':
      default:
        result.push(...buffer, tag)
        buffer = []
        break
    }
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
    case 'exact-match':
      return (
        <mark>
          {tag.content}
          <style jsx>{`
            mark {
              background-color: #ffee70;
            }
          `}</style>
        </mark>
      )
    case 'match':
      return <mark>{tag.content}</mark>
    case 'text':
    default:
      return <>{tag.content}</>
  }
}

export const SnippetHighlighter: React.FC<Props> = ({ snippet, query }) => {
  const parsedSnippet = useMemo(() => {
    return findExactMatch(parseTextWithTags(snippet), query)
  }, [snippet, query])
  return (
    <>
      {parsedSnippet.map((tag, i) => (
        <TagRenderer key={i} tag={tag} />
      ))}
    </>
  )
}
