import '@/styles/postlist.scss'
import { localizeDate } from '@/utils/date'
import { textLinkify } from '@/utils/link'
import { useHistory } from 'react-router-dom'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import { BlogPost, Color, PostListData } from '@/@types/posts'
import { concatClass } from '@/utils/component'

interface PostListComponentProps {
  data: PostListData
}

interface TagComponentProps {
  color?: Color
  text: string
}

const tagColor: Record<Color, string | undefined> = {
  default: undefined,
  gray: '#7b7b7b',
  brown: '#dc945c',
  orange: '#ffa561',
  yellow: '#ffef00',
  green: '#64ff4b',
  blue: '#63bcff',
  purple: '#c663ff',
  pink: '#ff99f1',
  red: '#ff6c6c'
}

export const TagComponent = ({ color, text }: TagComponentProps) => {
  return (
    <div
      className='post-tag'
      style={{
        ['--color' as string]:
          color && tagColor[color] ? tagColor[color] : color
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
      className={concatClass('post', inPost && 'in-post')}
      tabIndex={0}
      role='link'
      onClick={() => move && move(data.title, data.id)}
      onKeyPress={ev => ev.key === 'Enter' && move && move(data.title, data.id)}
    >
      <div className='hero-image'>
        {data.background && (
          <LazyLoadImage
            src={data.background}
            effect={'opacity'}
          ></LazyLoadImage>
        )}
      </div>
      <div className='brief-data'>
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
    <div className='post-list'>
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
