import PostListComponent from './component'

import { useEffect, useState } from 'react'
import { LoadSpinner } from '../LoadSpinner'
import { SpacerComponent } from '../Spacer'

import { listsResponseParse } from '@/utils/parse'
import { APILoadState } from 'api'

import { ErrorComponent } from '@/components/elements/Error'

interface PostListContainerProps {
  server: string
}

const PostListContainer = ({ server }: PostListContainerProps) => {
  const [loadState, setLoadState] = useState<APILoadState>(
    APILoadState.ReadyToLoad
  )

  const [error, setError] = useState<Error>()
  const [data, setData] = useState<PostListData>()

  useEffect(() => {
    setLoadState(APILoadState.Loading)

    fetch(server)
      .then(v => {
        setLoadState(APILoadState.Loaded)

        return v.json()
      })
      .then(v => {
        if (!v.posts) throw new Error('Post list data response is not valid.')

        const parsed = listsResponseParse(v)

        setData(parsed)
      })
      .catch(e => {
        setError(e)
        setLoadState(APILoadState.Error)
      })
  }, [])

  return (
    <>
      {loadState === APILoadState.Loading && (
        <SpacerComponent h={60}>
          <LoadSpinner></LoadSpinner>
        </SpacerComponent>
      )}
      {loadState === APILoadState.Error && (
        <SpacerComponent h={60} flex={true}>
          <ErrorComponent error={error}></ErrorComponent>
        </SpacerComponent>
      )}
      {data && <PostListComponent data={data}></PostListComponent>}
    </>
  )
}

export default PostListContainer
