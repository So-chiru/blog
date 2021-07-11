import { openSearchOverlay } from '@/store/ui/actions'
import '@/styles/searchbox.scss'
import { concatClass } from '@/utils/component'
import { useEffect, useRef } from 'react'

import { RiSearchLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'

interface SearchBoxComponentProps {
  onClick?: () => void
  onChange?: (text: string) => void
  role?: string
  inputFocus?: boolean
  full?: boolean
  input?: boolean
}

interface SearchBoxContainerWithInputProps {
  onChange?: (text: string) => void
  inputFocus?: boolean
  debounce?: number
  full?: boolean
}

export const SearchBoxComponent = ({
  onClick,
  onChange,
  role,
  inputFocus,
  full,
  input = false
}: SearchBoxComponentProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      if (!inputFocus) {
        inputRef.current.blur()
      } else {
        requestAnimationFrame(() => {
          inputRef.current!.focus()
        })
      }
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  }, [inputFocus, inputRef.current])

  return (
    <div
      className={concatClass('search-box', full && 'full')}
      role={role ? role : input ? 'searchbox' : 'search'}
      tabIndex={input ? undefined : 0}
      aria-label={input ? '블로그 글 검색' : '블로그 글 검색 창 열기'}
      onClick={() => onClick && onClick()}
      onKeyPress={ev => ev.key === 'Enter' && onClick && onClick()}
    >
      <div className='icon' aria-hidden>
        <RiSearchLine></RiSearchLine>
      </div>
      {input && (
        <input
          type='search'
          name='Search'
          ref={inputRef}
          aria-label={'검색 할 내용을 입력하세요.'}
          autoFocus={true}
          placeholder=' '
          id='search-input'
          onChange={ev => onChange && onChange(ev.target.value)}
        />
      )}
      <div className='text' aria-hidden>
        <span>Search...</span>
      </div>
    </div>
  )
}

export const SearchBoxContainerWithInput = ({
  onChange,
  inputFocus,
  debounce,
  full
}: SearchBoxContainerWithInputProps) => {
  let timeout: number

  const change = (text: string) => {
    if (!onChange) {
      return
    }

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = (setTimeout(() => {
      onChange(text)
    }, debounce || 0) as unknown) as number
  }

  return (
    <SearchBoxComponent
      input={true}
      inputFocus={inputFocus}
      onChange={change}
      full={full}
    ></SearchBoxComponent>
  )
}

interface SearchBoxContainerProps {
  role?: string
}

export const SearchBoxContainer = ({ role }: SearchBoxContainerProps) => {
  const dispatch = useDispatch()

  const openOverlay = () => {
    dispatch(openSearchOverlay(true))
  }

  return (
    <SearchBoxComponent onClick={openOverlay} role={role}></SearchBoxComponent>
  )
}
