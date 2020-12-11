import { TagForSearchSnippet } from '@src/types'

export const SnippetTagRenderer: React.FC<{ tag: TagForSearchSnippet }> = ({ tag }) => {
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
