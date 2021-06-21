import '@/styles/postlist.scss'
import { localizeDate } from '@/utils/date'
import { textLinkify } from '@/utils/link'
import { useHistory } from 'react-router-dom'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'

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

const TagComponent = ({ color, text }: TagComponentProps) => {
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

const PostListComponent = ({ data }: PostListComponentProps) => {
  const history = useHistory()

  const goPost = (title: string, id: string) => {
    history.push('/post/' + textLinkify(title) + id.replace(/-/g, ''))
  }

  return (
    <div className='post-list'>
      {...data.posts.map(v => (
        <div
          key={v.id}
          data-id={v.id}
          className='post'
          tabIndex={0}
          role='link'
          onClick={() => goPost(v.title, v.id)}
          onKeyPress={ev => ev.key === 'Enter' && goPost(v.title, v.id)}
        >
          <div className='hero-image'>
            {v.background && (
              <LazyLoadImage
                src={v.background}
                effect={'opacity'}
              ></LazyLoadImage>
            )}
          </div>
          <div className='brief-data'>
            <h3 className='title'>{v.title}</h3>
            <p className='description'>{v.description}</p>
          </div>
          <div className='meta-data'>
            {v.tags &&
              v.tags.map(tag => {
                return (
                  <TagComponent
                    key={v.id + '.' + tag.id}
                    color={tag.color}
                    text={tag.name}
                  ></TagComponent>
                )
              })}
            <TagComponent
              text={localizeDate(new Date(v.created))}
            ></TagComponent>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostListComponent
