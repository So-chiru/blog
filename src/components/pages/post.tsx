import { concatClass } from '@/utils/component'
import { validatePostID } from '@/utils/parse'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { HeaderContainer as Header } from '../elements/Header'
import { SpacerComponent } from '../elements/Spacer'

import '@/styles/post.scss'
import { PostViewContainer } from '../elements/PostView/container'
import { ErrorComponent } from '../elements/Error'

declare global {
  interface Window {
    sochiruBlogPrefetch?: { error: string | null; data?: string }
  }
}

const PostPage = () => {
  const route = useRouteMatch<{
    postId: string
  }>()

  const history = useHistory()

  const goBlog = () => {
    history.push('/blog')
  }

  return (
    <div className={concatClass('page', 'post-page')}>
      <SpacerComponent h={16}>
        <Header onLogoClick={goBlog}></Header>
      </SpacerComponent>
      {window.sochiruBlogPrefetch ? (
        <PostViewContainer
          preData={window.sochiruBlogPrefetch}
        ></PostViewContainer>
      ) : validatePostID(route.params.postId) ? (
        <PostViewContainer
          id={route.params.postId}
          server={`${API_SERVER}post`}
        ></PostViewContainer>
      ) : (
        <SpacerComponent flex={true} h={120}>
          <ErrorComponent
            type={'게시글'}
            error={new Error('게시글 URL이 올바르지 않아요.')}
          ></ErrorComponent>
        </SpacerComponent>
      )}
    </div>
  )
}

export default PostPage
