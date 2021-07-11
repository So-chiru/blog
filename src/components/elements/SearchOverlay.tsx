import React, { useEffect, useState } from 'react'

import '@/styles/searchoverlay.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { concatClass } from '@/utils/component'
import { openSearchOverlay } from '@/store/ui/actions'
import { SpacerComponent } from './Spacer'
import { SearchBoxContainerWithInput } from './SearchBox'
import { APILoadState } from 'api'
import { BlogPost, PostListData } from 'posts'
import { LoadSpinner } from './LoadSpinner'
import { ErrorComponent, ErrorTemplateComponent } from './Error'
import { useHistory } from 'react-router-dom'
import { textLinkify } from '@/utils/link'
import { TagComponent } from './PostList/component'

interface SearchOverlayComponentProps {
  show: boolean
  change?: (text: string) => void
  close: () => void
  text?: string

  error?: Error
  load?: APILoadState
  result?: PostListData
}

interface SearchOverlayResultComponentProps {
  post: BlogPost
  click?: (id: string, title: string) => void
}

const SearchOverlayResultComponent = ({
  post,
  click
}: SearchOverlayResultComponentProps) => {
  return (
    <div
      className='search-result-item'
      onClick={() => click && click(post.id, post.title)}
      tabIndex={0}
      role='link'
      aria-label={
        post.title +
        ' 게시글. ' +
        (post.description ||
          '게시글이 로딩 중이거나 설명이 부여되지 않았습니다.') +
        '. ' +
        (post.created
          ? new Date(post.created).toLocaleDateString('ko-KR') + ' 에 게시됨.'
          : '')
      }
      onKeyPress={ev =>
        ev.key === 'Enter' && click && click(post.id, post.title)
      }
    >
      <p className='title'>{post.title}</p>
      <p className='description'>
        {post.description} (
        {post.created
          ? new Date(post.created).toDateString() + ' 에 작성됨.'
          : '작성일 없음.'}
        )
      </p>
      <div className='tags'>
        {post.tags &&
          post.tags.map(tag => {
            return (
              <TagComponent
                key={post.id + '.' + tag.id}
                color={tag.color}
                text={tag.name}
              ></TagComponent>
            )
          })}
      </div>
    </div>
  )
}

export const SearchOverlayComponent = ({
  show,
  change,
  text,
  close,
  error,
  load,
  result
}: SearchOverlayComponentProps) => {
  const history = useHistory()

  const goPost = (id: string, title: string) => {
    history.push('/blog/' + textLinkify(title) + id.replace(/-/g, ''))
    close()
  }

  return (
    <div
      className={concatClass('search-overlay', show && 'show')}
      role='diglog'
    >
      <div className='background' onClick={() => close && close()}></div>
      <div className='contents'>
        <div
          className='close-button'
          role='button'
          tabIndex={0}
          aria-label='검색 창 닫기'
          onClick={() => close && close()}
          onKeyPress={ev => ev.code === 'Enter' && close && close()}
        ></div>
        <SpacerComponent template='search-overlay-header'>
          <h1 className='search-overlay-title'>검색</h1>
        </SpacerComponent>
        <SpacerComponent>
          <SearchBoxContainerWithInput
            full={true}
            inputFocus={show}
            debounce={300}
            onChange={change}
          ></SearchBoxContainerWithInput>
        </SpacerComponent>
        {load === APILoadState.Loaded && text && (
          <SpacerComponent h={32} flex={true}>
            <div
              className='results'
              aria-label={
                result && result.posts.length
                  ? result.posts.length + '개의 게시글이 검색되었습니다.'
                  : '검색된 게시글이 없습니다.'
              }
              aria-live={'assertive'}
            >
              {result && result.posts.length ? (
                result.posts.map((post, index) => (
                  <SearchOverlayResultComponent
                    key={post.id + 'search_res' + index}
                    post={post}
                    click={goPost}
                  ></SearchOverlayResultComponent>
                ))
              ) : (
                <ErrorTemplateComponent
                  title='텅 비었어요...'
                  text='검색 결과가 없습니다.'
                  mute='글에서 사용될만한 단어를 입력해보세요.'
                ></ErrorTemplateComponent>
              )}
              {(result && result.posts.length && (
                <p className='muted'>총 {result.posts.length}개의 검색 결과</p>
              )) || <></>}
            </div>
          </SpacerComponent>
        )}
        <SpacerComponent h={32} flex={true}>
          {(load === APILoadState.Loading && <LoadSpinner></LoadSpinner>) ||
            (APILoadState.Error && error ? (
              <ErrorComponent error={error} type='검색'></ErrorComponent>
            ) : (
              <></>
            ))}
        </SpacerComponent>
      </div>
    </div>
  )
}

export const SearchOverlayContainer = () => {
  const open = useSelector((state: RootState) => state.ui.searchOverlay)
  const dispatch = useDispatch()

  const [loadState, setLoadState] = useState<APILoadState>(
    APILoadState.ReadyToLoad
  )

  const [text, setText] = useState<string>()

  const [error, setError] = useState<Error>()
  const [result, setResult] = useState<PostListData>()

  useEffect(() => {
    const body = document.querySelector('body')

    if (!body) {
      return
    }

    if (open) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!text) {
      setResult(undefined)

      return
    }

    setLoadState(APILoadState.Loading)
    setError(undefined)

    fetch(`${API_SERVER}search?q=${encodeURIComponent(text)}`)
      .then(res => {
        setLoadState(APILoadState.Loaded)

        return res.json()
      })
      .then(res => {
        if (res.error) {
          throw new Error(res.error)
        }

        if (!res.posts) {
          throw new Error('올바른 검색 데이터가 아닙니다.')
        }

        setResult(res)
      })
      .catch(e => {
        setError(e)
        setLoadState(APILoadState.Error)
      })
  }, [text])

  const close = () => {
    dispatch(openSearchOverlay(false))
  }

  return (
    <SearchOverlayComponent
      show={open}
      text={text}
      load={loadState}
      error={error}
      result={result}
      close={close}
      change={(text: string) => setText(text)}
    ></SearchOverlayComponent>
  )
}
