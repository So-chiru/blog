import { concatClass } from '@/utils/component'
import { validatePostID } from '@/utils/parse'
import { useRouteMatch } from 'react-router-dom'
import { HeaderContainer as Header } from '../elements/Header'
import { SpacerComponent } from '../elements/Spacer'

import '@/styles/post.scss'
import { PostViewContainer } from '../elements/PostView/container'

interface PostErrorComponentProps {
  error?: Error
}

const PostErrorComponent = ({ error }: PostErrorComponentProps) => {
  return (
    <div className='post-error'>
      <h1 className='icon'>🥺</h1>
      <h3>오오오오오오오오류</h3>
      <p>
        게시글 목록을 가져오지 못했어요.{' '}
        <span className='mute'>{error && error.message}</span>
      </p>
    </div>
  )
}

const PostPage = () => {
  const route = useRouteMatch<{
    postId: string
  }>()

  return (
    <div className={concatClass('page', 'post-page')}>
      <SpacerComponent h={16}>
        <Header></Header>
      </SpacerComponent>
      {validatePostID(route.params.postId) ? (
        <PostViewContainer
          id={route.params.postId}
          server={`${API_SERVER}post`}
        ></PostViewContainer>
      ) : (
        <SpacerComponent flex={true} h={120}>
          <PostErrorComponent
            error={new Error('게시글이 존재하지 않아요.')}
          ></PostErrorComponent>
        </SpacerComponent>
      )}
    </div>
  )
}

export default PostPage
