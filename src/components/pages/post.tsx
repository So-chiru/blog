import { concatClass } from '@/utils/component'
import { validatePostID } from '@/utils/parse'
import { useRouteMatch } from 'react-router-dom'
import { HeaderContainer as Header } from '../elements/Header'
import { SpacerComponent } from '../elements/Spacer'

import '@/styles/post.scss'
import { PostViewContainer } from '../elements/PostView/container'
import { ErrorComponent } from '../elements/Error'

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
