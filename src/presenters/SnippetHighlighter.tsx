import { TagForSearchSnippet } from '@src/types'

interface Props {
  /**
   * snippet: text includes <em> tags
   */
  snippet: TagForSearchSnippet[]
}

const TagRenderer: React.FC<{ tag: TagForSearchSnippet }> = ({ tag }) => {
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

export const SnippetHighlighter: React.FC<Props> = ({ snippet }) => {
  return (
    <>
      {snippet.map((tag, i) => (
        <TagRenderer key={i} tag={tag} />
      ))}
    </>
  )
}
