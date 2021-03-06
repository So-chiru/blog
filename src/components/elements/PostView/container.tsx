import { APILoadState } from 'api'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ErrorComponent } from '../Error'
import { LoadSpinner } from '../LoadSpinner'
import { SpacerComponent } from '../Spacer'
import { PostViewComponent } from './component'

import loaderActions from '@/store/loader/actions'
import { PostBriefComponent } from '../PostList/component'
import { BlogPostWithBlocks } from 'posts'
import { extractPostTitleURL } from '@/utils/parse'
import CommentContainer from '../Comment'
import SiteMetadata from '@/components/metadata'

interface PostViewContainerProps {
  id?: string
  preData?: { error: null | string; data?: string }
  server?: string
}

export const PostViewContainer = ({
  id,
  preData,
  server
}: PostViewContainerProps) => {
  const [loadState, setLoadState] = useState<APILoadState>(
    APILoadState.ReadyToLoad
  )

  const [error, setError] = useState<Error>()
  const [data, setData] = useState<BlogPostWithBlocks>()

  const dispatch = useDispatch()

  useEffect(() => {
    setLoadState(APILoadState.Loading)
    dispatch(loaderActions.start())

    if (!preData) {
      fetch(server + '?id=' + id)
        .then(v => {
          setLoadState(APILoadState.Loaded)

          return v.text()
        })
        .then(v => {
          if (v.substring(0, 1) !== '{') {
            throw new Error(v)
          }

          const obj = JSON.parse(v)

          if (obj.error) {
            throw new Error(obj.error)
          }

          if (!obj.id || !obj.title) {
            throw new Error('유효하지 않은 게시글 형식.')
          }

          if (!obj.blocks || !obj.blocks.length) {
            throw new Error('게시글 내용이 없습니다.')
          }

          setData(obj)

          dispatch(loaderActions.done())
        })
        .catch(e => {
          setError(e)
          setLoadState(APILoadState.Error)

          dispatch(loaderActions.failed(e))
        })
    } else {
      if (preData.error) {
        setLoadState(APILoadState.Error)
        const error = new Error(unescape(preData.error))

        setError(error)
        dispatch(loaderActions.failed(error))

        return
      }

      if (preData.data) {
        setLoadState(APILoadState.Loaded)
        setData(JSON.parse(unescape(preData.data)))
        dispatch(loaderActions.done())
      }
    }
  }, [])

  return (
    <>
      {!preData && (
        <SiteMetadata
          title={((data && data.title) || '로딩 중...') + ' - Sochiru Blog'}
          description={data && data.description}
          image={data && data.background}
          type={'article'}
        ></SiteMetadata>
      )}
      {loadState !== APILoadState.Error && (
        <SpacerComponent ht={32} hb={32} w={0} flex={true}>
          <PostBriefComponent
            inPost={true}
            data={
              data || {
                id: 'unknown',
                title: extractPostTitleURL(window.location.href) || '로딩 중...'
              }
            }
          ></PostBriefComponent>
        </SpacerComponent>
      )}

      {loadState === APILoadState.Loading && <LoadSpinner></LoadSpinner>}
      {loadState === APILoadState.Error && (
        <SpacerComponent h={60} flex={true}>
          <ErrorComponent error={error} type={'게시글'}></ErrorComponent>
        </SpacerComponent>
      )}
      <PostViewComponent blocks={data && data.blocks}></PostViewComponent>
      <SpacerComponent ht={32} hb={128} w={0} flex={true}>
        <CommentContainer></CommentContainer>
      </SpacerComponent>
    </>
  )
}
