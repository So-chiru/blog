import { Route, Switch } from 'react-router-dom'
import { HeaderContainer as Header } from './elements/Header'
import Loader from './loader/loader'
import AboutPage from './pages/about'
import BlogPage from './pages/blog'
import PostPage from './pages/post'
import NotFoundPage from './pages/not-found'
import Theme from './theme'

// 애플리케이션의 최상위 (따지면 아니지만) 가 될 컴포넌트입니다. 이 안에서 원하는 컴포넌트들을
// 정의하여 사용하시면 됩니다.
const App = () => {
  return (
    <>
      <Header fixed={true} hideUntil={60} background={true}></Header>
      <Theme></Theme>
      <Switch>
        <Route path='/' exact>
          <AboutPage></AboutPage>
        </Route>
        <Route path='/blog' exact>
          <BlogPage></BlogPage>
        </Route>
        <Route path='/blog/:postId'>
          <PostPage></PostPage>
        </Route>
        <Route path='/api/post'>
          <PostPage></PostPage>
        </Route>
        <Route path='/'>
          <NotFoundPage></NotFoundPage>
        </Route>
      </Switch>
      <Loader></Loader>
    </>
  )
}

export default App
