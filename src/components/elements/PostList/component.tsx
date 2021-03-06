import '@/styles/postlist.scss'
import { localizeDate } from '@/utils/date'
import { textLinkify } from '@/utils/link'
import { useHistory } from 'react-router-dom'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import { BlogPost, Color, PostListData } from '@/@types/posts'
import { concatClass } from '@/utils/component'
import { colorShade } from '@/utils/color'

interface PostListComponentProps {
  data: PostListData
}

interface TagComponentProps {
  color?: Color
  text: string
  id?: string
}

const tagColor: Record<Color, string> = {
  default: '',
  gray: '#d4d4d4',
  brown: '#ab693f',
  orange: '#f2a879',
  yellow: '#f5e83b',
  green: '#98f089',
  blue: '#89c2f0',
  purple: '#cc89f0',
  pink: '#fca2e0',
  red: '#fab1b1'
}

export const TagComponent = ({ color, text, id }: TagComponentProps) => {
  return (
    <div
      className='post-tag'
      data-id={id}
      style={{
        ['--color' as string]:
          color && tagColor[color] ? tagColor[color] : color,
        ['--darken-color' as string]:
          color && tagColor[color] ? colorShade(tagColor[color], 1.3, 0.12) : color
      }}
    >
      <span className='text'>{text}</span>
    </div>
  )
}

interface PostBriefComponentProps {
  data: BlogPost
  move?: (title: string, id: string) => void
  inPost?: boolean
}

export const PostBriefComponent = ({
  data,
  move,
  inPost
}: PostBriefComponentProps) => {
  return (
    <div
      data-id={data.id}
      className={concatClass(
        'post',
        inPost && 'in-post',
        !data.background && 'no-hero'
      )}
      tabIndex={0}
      role={inPost ? 'contentinfo' : 'link'}
      aria-live={inPost ? 'polite' : undefined}
      aria-label={
        data.title +
        ' 게시글. ' +
        (data.description ||
          '게시글이 로딩 중이거나 설명이 부여되지 않았습니다.') +
        '. ' +
        (data.created
          ? new Date(data.created).toLocaleDateString('ko-KR') + ' 에 게시됨.'
          : '')
      }
      onClick={() => move && move(data.title, data.id)}
      onKeyPress={ev => ev.key === 'Enter' && move && move(data.title, data.id)}
    >
      {data.background && (
        <div className='hero-image'>
          {
            <LazyLoadImage
              src={data.background}
              effect={'opacity'}
            ></LazyLoadImage>
          }
        </div>
      )}
      <div className='brief-data' id='brief-data'>
        <h3 className='title'>{data.title}</h3>
        {!inPost && <p className='description'>{data.description}</p>}
      </div>
      <div className='meta-data'>
        {data.tags &&
          data.tags.map(tag => {
            return (
              <TagComponent
                key={data.id + '.' + tag.id}
                color={tag.color}
                text={tag.name}
              ></TagComponent>
            )
          })}
        {data.created && (
          <TagComponent
            id='date'
            text={localizeDate(new Date(data.created))}
          ></TagComponent>
        )}
      </div>
    </div>
  )
}

const PostListComponent = ({ data }: PostListComponentProps) => {
  const history = useHistory()

  const goPost = (title: string, id: string) => {
    history.push('/blog/' + textLinkify(title) + id.replace(/-/g, ''))
  }

  return (
    <div
      className='post-list'
      role='group'
      aria-label={
        '블로그 게시글 목록. ' + data.posts.length + '개의 게시글이 보여짐.'
      }
      aria-live='polite'
    >
      {...data.posts.map(v => (
        <PostBriefComponent
          key={v.id}
          data={v}
          move={goPost}
        ></PostBriefComponent>
      ))}
    </div>
  )
}

export default PostListComponent
