import { Block } from '@/lib/notion/api-types'
import { APILoadState } from 'api'
import { useEffect, useState } from 'react'
import { ErrorComponent } from '../Error'
import { LoadSpinner } from '../LoadSpinner'
import { SpacerComponent } from '../Spacer'
import { PostViewComponent } from './component'

interface PostViewContainerProps {
  id: string
  server: string
}

export const PostViewContainer = ({ id, server }: PostViewContainerProps) => {
  const [loadState, setLoadState] = useState<APILoadState>(
    APILoadState.ReadyToLoad
  )

  const [error, setError] = useState<Error>()
  const [data, setData] = useState<Block[]>()

  useEffect(() => {
    setLoadState(APILoadState.Loading)

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

        if (obj.object !== 'list') {
          throw new Error('유효하지 않은 게시글 형식.')
        }

        if (!obj.results) {
          throw new Error('결과가 없습니다.')
        }

        setData(obj.results)
      })
      .catch(e => {
        setError(e)
        setLoadState(APILoadState.Error)
      })
  }, [])

  return (
    <>
      {loadState === APILoadState.Loading && <LoadSpinner></LoadSpinner>}
      {loadState === APILoadState.Error && (
        <SpacerComponent h={60} flex={true}>
          <ErrorComponent error={error}></ErrorComponent>
        </SpacerComponent>
      )}
      <PostViewComponent blocks={data}></PostViewComponent>
    </>
  )
}
