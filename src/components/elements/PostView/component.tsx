import {
  AudioBlock,
  Block,
  EmbedBlock,
  RichText,
  VideoBlock,
} from '@notionhq/client/build/src/api-types'

import '@/styles/post.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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

const handleAudioTypes = (audio: AudioBlock) => {
  if (audio.audio.type === 'file') {
    return <audio src={audio.audio.file.url} controls></audio>
  }

  return <audio src={audio.audio.external.url} controls></audio>
}

const handleEmbedTypes = (embed: EmbedBlock) => {
  if (embed.embed.url.indexOf('open.spotify.com/') > -1) {
    return (
      <iframe
        className='post-spotify-audio'
        src={embed.embed.url.replace(
          /open\.spotify\.com\//g,
          'open.spotify.com/embed/'
        )}
      ></iframe>
    )
  }

  return <embed src={embed.embed.url}></embed>
}

const handleVideoTypes = (video: VideoBlock) => {
  if (video.video.type === 'file') {
    return (
      <video src={video.video.file.url} controls autoPlay muted loop></video>
    )
  }

  if (video.video.external.url.indexOf('youtube.com') > -1) {
    const parseId = video.video.external.url.split('/')
    return (
      <iframe
        className='post-youtube-video'
        src={
          'https://www.youtube.com/embed/' +
          parseId[parseId.length - 1].replace(/watch\?v=/g, '')
        }
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    )
  }

  return (
    <div className=''>
      알 수 없는 영상 공급자.{' '}
      <a href={video.video.external.url}>{video.video.external.url}</a>
    </div>
  )
}

const blockHandler = (v: Block, i: number, blocks?: Block[]) => {
  let numberedListIndex = 0

  switch (v.type) {
    case 'unsupported':
      return (
        <p key={v.id} className='unsupported'>
          현재 지원되지 않는 블럭입니다. Notion API 업데이트까지 기다려주세요.
          ID: {v.id}
        </p>
      )
    case 'paragraph':
      return (
        <p key={v.id}>
          {v.paragraph.text.map((text, index) => (
            <span key={v.id + '-in-' + index} {...blockPropertyHandler(text)}>
              {replaceSpace(text.plain_text) || ''}
            </span>
          ))}
        </p>
      )
    case 'heading_1':
      return (
        <h1 key={v.id}>
          {(v.heading_1.text.length && v.heading_1.text[0].plain_text) || ''}
        </h1>
      )
    case 'heading_2':
      return (
        <h2 key={v.id}>
          {(v.heading_2.text.length && v.heading_2.text[0].plain_text) || ''}
        </h2>
      )
    case 'heading_3':
      return (
        <h3 key={v.id}>
          {(v.heading_3.text.length && v.heading_3.text[0].plain_text) || ''}
        </h3>
      )
    case 'bulleted_list_item':
      return (
        <div className='bullted-list-item' key={v.id}>
          {...v.bulleted_list_item.text.map((bulltedItem, bulltedItemIndex) => {
            return (
              <div
                className='text'
                key={v.id + bulltedItemIndex}
                {...blockPropertyHandler(bulltedItem)}
              >
                {bulltedItem.plain_text}
              </div>
            )
          })}
        </div>
      )
    case 'numbered_list_item':
      return (
        <div className='numbered-list-item' key={v.id}>
          {...v.numbered_list_item.text.map(
            (numberedItem, numberedItemIndex) => {
              if (blocks && blocks[i].type === 'numbered_list_item') {
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
                  <span className='index'>{numberedListIndex}.</span>
                  {numberedItem.plain_text}
                </div>
              )
            }
          )}
        </div>
      )
    case 'to_do':
      return (
        <div className='todo'>
          <input type='checkbox' disabled checked={v.to_do.checked}></input>
          {
            // TODO : Fix to match annotation.
          }
          <span>{v.to_do.text.map(r => r.plain_text).join(' ')}</span>
        </div>
      )
    case 'toggle':
      return (
        <div className='toggle'>
          <input type='checkbox' id={`${v.type}-${v.id}`}></input>
          <label htmlFor={`${v.type}-${v.id}`}>
            {v.toggle.text.map(r => r.plain_text).join(' ')}
          </label>
          <div className='toggle-contents'>
            {v.toggle.children?.map((b, bi) => blockHandler(b, bi))}
          </div>
        </div>
      )
    case 'image':
      return (
        <div className='post-image'>
          <LazyLoadImage
            src={
              v.image.type === 'file' ? v.image.file.url : v.image.external.url
            }
            // TODO : Fix to match annotation.
            alt={v.image.caption?.map(r => r.plain_text).join(' ') ?? '이미지'}
            effect={'opacity'}
          ></LazyLoadImage>
        </div>
      )
    case 'video':
      return <div className='post-video'>{handleVideoTypes(v)}</div>
    case 'audio':
      return <div className='post-audio'>{handleAudioTypes(v)}</div>
    case 'embed':
      return <div className='post-embed'>{handleEmbedTypes(v)}</div>
    default:
      console.warn('Supported, but no handler was providen: ', v)
      return (
        <p key={v.id} className='unhandled-block'>
          {v.id}: {v.type}
        </p>
      )
  }
}

export const PostViewComponent = ({ blocks }: PostViewComponentProps) => {
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
      {blocks && blocks.map((v, i) => blockHandler(v, i, blocks))}
    </article>
  )
}
