import { Block } from '@/lib/notion/api-types'

interface PostViewComponentProps {
  blocks?: Block[]
}

export const PostViewComponent = ({ blocks }: PostViewComponentProps) => {
  return (
    <div>
      {blocks &&
        blocks.map(v => {
          switch (v.type) {
            case 'unsupported':
              return <p key={v.id}>현재 지원되지 않는 블럭입니다.</p>
            case 'paragraph':
              return <p key={v.id}>{v.paragraph.text[0].plain_text}</p>
            default:
              return (
                <p key={v.id}>
                  {v.id}: {v.type}
                </p>
              )
          }
        })}
    </div>
  )
}
