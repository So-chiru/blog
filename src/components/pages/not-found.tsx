import { concatClass } from '@/utils/component'
import { ShortBiography } from '../elements/Biography/short'
import { ErrorTemplateComponent } from '../elements/Error'
import { LinkHeaderContainer as LinkHeader } from '../elements/LinkHeader'
import { SpacerComponent } from '../elements/Spacer'
import SiteMetadata from '../metadata'

const BlogPage = () => {
  return (
    <div className={concatClass('page', 'blog-page')}>
      <SiteMetadata
        title={'Sochiru Blog'}
        description={
          'Full-Stack Developer (yet), CS Student. Interested in design.'
        }
        type='profile'
      ></SiteMetadata>
      <SpacerComponent template='blog-biography'>
        <ShortBiography></ShortBiography>
      </SpacerComponent>
      <SpacerComponent hb={30}>
        <LinkHeader></LinkHeader>
      </SpacerComponent>
      <SpacerComponent h={120}>
        <ErrorTemplateComponent
          title='404 Not Found'
          text={'페이지가 존재하지 않아요.'}
        ></ErrorTemplateComponent>
      </SpacerComponent>
    </div>
  )
}

export default BlogPage
