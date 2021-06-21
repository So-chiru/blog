import { concatClass } from '@/utils/component'
import { ShortBiography } from '../elements/Biography/short'
import { LinkHeaderContainer as LinkHeader } from '../elements/LinkHeader'
import PostListContainer from '../elements/PostList/container'
import { SpacerComponent } from '../elements/Spacer'

const BlogPage = () => {
  return (
    <div className={concatClass('page', 'blog-page')}>
      <SpacerComponent ht={120} hb={60}>
        <ShortBiography></ShortBiography>
      </SpacerComponent>
      <SpacerComponent hb={30}>
        <LinkHeader></LinkHeader>
      </SpacerComponent>
      <PostListContainer server={`${API_SERVER}lists`}></PostListContainer>
    </div>
  )
}

export default BlogPage
