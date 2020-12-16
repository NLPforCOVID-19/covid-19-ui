import { TagForSearchSnippet } from '@src/types'

export const SnippetTagRenderer: React.FC<{ tag: TagForSearchSnippet }> = ({ tag }) => {
    switch (tag.type) {
        case 'exact-match':
            return (
                <mark>
                    {tag.content}
                    <style jsx>{`
            mark {
              background-color: #ffbbbb;
            }
          `}</style>
                </mark>
            )
        case 'match':
            return (
                <mark>
                    {tag.content}
                    <style jsx>{`
              mark {
                background-color: #ffeeee;
              }
            `}</style>
                </mark>
            )
        case 'text':
        default:
            return <>{tag.content}</>
    }
}

