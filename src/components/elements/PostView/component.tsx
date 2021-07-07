import { Block, RichText } from '@/lib/notion/api-types'

import '@/styles/post.scss'

interface PostViewComponentProps {
  blocks?: Block[]
}

interface AnnotationsData {
  [key: string]: unknown
}

export const keysTyped = Object.keys as <T>(o: T) => Extract<keyof T, string>[]

const blockPropertyHandler = (text: RichText) => {
  const obj: AnnotationsData = {}

  keysTyped<RichText['annotations']>(text.annotations).forEach(v => {
    if (text.annotations[v]) {
      obj['data-' + v] = text.annotations[v]
    }
  })

  if (text.href) {
    obj['data-href'] = text.href
  }

  if (text.type !== 'text') {
    obj['data-type'] = text.type
  }

  return obj
}

const replaceSpace = (str: string) => str.replace(/\s/g, '\u00a0')

export const PostViewComponent = ({ blocks }: PostViewComponentProps) => {
  let numberedListIndex = 0

  return (
    <article
      className='post-view-component'
      aria-label={
        '게시글의 내용. ' +
        (blocks
          ? blocks.length + '개의 블럭이 존재합니다.'
          : '아직 페이지가 로딩 중인 것 같아요.')
      }
    >
      {blocks &&
        blocks.map((v, i) => {
          // console.log(v)

          switch (v.type) {
            case 'unsupported':
              return (
                <p key={v.id} className='unsupported'>
                  현재 지원되지 않는 블럭입니다. Notion API 업데이트까지
                  기다려주세요. ID: {v.id}
                </p>
              )
            case 'paragraph':
              return (
                <p key={v.id}>
                  {v.paragraph.text.map((text, index) => (
                    <span
                      key={v.id + '-in-' + index}
                      {...blockPropertyHandler(text)}
                    >
                      {replaceSpace(text.plain_text) || ''}
                    </span>
                  ))}
                </p>
              )
            case 'heading_1':
              return (
                <h1 key={v.id}>
                  {(v.heading_1.text.length &&
                    v.heading_1.text[0].plain_text) ||
                    ''}
                </h1>
              )
            case 'heading_2':
              return (
                <h2 key={v.id}>
                  {(v.heading_2.text.length &&
                    v.heading_2.text[0].plain_text) ||
                    ''}
                </h2>
              )
            case 'heading_3':
              return (
                <h3 key={v.id}>
                  {(v.heading_3.text.length &&
                    v.heading_3.text[0].plain_text) ||
                    ''}
                </h3>
              )
            case 'bulleted_list_item':
              return (
                <div className='bullted-list-item' key={v.id}>
                  {...v.bulleted_list_item.text.map(
                    (bulltedItem, bulltedItemIndex) => {
                      return (
                        <div
                          className='text'
                          key={v.id + bulltedItemIndex}
                          {...blockPropertyHandler(bulltedItem)}
                        >
                          {bulltedItem.plain_text}
                        </div>
                      )
                    }
                  )}
                </div>
              )
            case 'numbered_list_item':
              return (
                <div className='numbered-list-item' key={v.id}>
                  {...v.numbered_list_item.text.map(
                    (numberedItem, numberedItemIndex) => {
                      if (blocks[i].type === 'numbered_list_item') {
                        numberedListIndex++
                      } else {
                        numberedListIndex = 1
                      }

                      return (
                        <div
                          className='text'
                          key={v.id + numberedItemIndex}
                          {...blockPropertyHandler(numberedItem)}
                        >
                          <span className='index'>{numberedListIndex}.</span>{numberedItem.plain_text}
                        </div>
                      )
                    }
                  )}
                </div>
              )
            default:
              // console.warn('Supported, but no handler was providen: ', v)
              return (
                <p key={v.id} className='unhandled-block'>
                  {v.id}: {v.type}
                </p>
              )
          }
        })}
    </article>
  )
}
