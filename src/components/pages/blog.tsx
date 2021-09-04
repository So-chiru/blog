import { concatClass } from '@/utils/component'
import { ShortBiography } from '../elements/Biography/short'
import { LinkHeaderContainer as LinkHeader } from '../elements/LinkHeader'
import PostListContainer from '../elements/PostList/container'
import { SpacerComponent } from '../elements/Spacer'
import SiteMetadata from '../metadata'

const BlogPage = () => {
  return (
    <div className={concatClass('page', 'blog-page')}>
      <SiteMetadata
        title={'Sochiru Blog'}
        description={
          'make somewhat unorthodox things'
        }
        type='profile'
      ></SiteMetadata>
      <SpacerComponent template='blog-biography'>
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
