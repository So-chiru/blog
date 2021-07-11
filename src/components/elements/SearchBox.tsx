import { openSearchOverlay } from '@/store/ui/actions'
import '@/styles/searchbox.scss'
import { concatClass } from '@/utils/component'
import { useEffect, useRef } from 'react'

import { RiSearchLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'

interface SearchBoxComponentProps {
  onClick?: () => void
  onChange?: (text: string) => void
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
      role={input ? 'group' : 'button'}
      aria-label={input ? '' : ''}
      tabIndex={0}
      onClick={() => onClick && onClick()}
      onKeyPress={ev => ev.key === 'Enter' && onClick && onClick()}
    >
      <div className='icon' aria-hidden>
        <RiSearchLine></RiSearchLine>
      </div>
      {input && (
        <input
          type='text'
          name='Search'
          ref={inputRef}
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

export const SearchBoxContainer = () => {
  const dispatch = useDispatch()

  const openOverlay = () => {
    dispatch(openSearchOverlay(true))
  }

  return <SearchBoxComponent onClick={openOverlay}></SearchBoxComponent>
}
