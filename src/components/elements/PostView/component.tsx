import { Block } from '@/lib/notion/api-types'

import '@/styles/post.scss'

interface PostViewComponentProps {
  blocks?: Block[]
}

export const PostViewComponent = ({ blocks }: PostViewComponentProps) => {
  return (
    <div className='post-view-component'>
      {blocks &&
        blocks.map(v => {
          switch (v.type) {
            case 'unsupported':
              return (
                <p key={v.id} className='unsupported'>
                  현재 지원되지 않는 블럭입니다. Notion API 업데이트까지 기다려주세요.
                </p>
              )
            case 'paragraph':
              return <p key={v.id}>{v.paragraph.text[0].plain_text}</p>
            case 'heading_1':
              return <h1 key={v.id}>{v.heading_1.text[0].plain_text}</h1>
            case 'heading_2':
              return <h2 key={v.id}>{v.heading_2.text[0].plain_text}</h2>
            case 'heading_3':
              return <h3 key={v.id}>{v.heading_3.text[0].plain_text}</h3>
            case 'bulleted_list_item':
              console.log(v.bulleted_list_item)
              return (
                <div className='bullted-list-item' key={v.id}>
                  {...v.bulleted_list_item.text.map(
                    (bulltedItem, bulltedItemIndex) => {
                      return (
                        <div className='text' key={v.id + bulltedItemIndex}>
                          {bulltedItem.plain_text}
                        </div>
                      )
                    }
                  )}
                </div>
              )
            default:
              console.log(v)
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
