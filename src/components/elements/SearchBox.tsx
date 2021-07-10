import { openSearchOverlay } from '@/store/ui/actions'
import '@/styles/searchbox.scss'
import { concatClass } from '@/utils/component'
import { useEffect } from 'react'

import { RiSearchLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'

interface SearchBoxComponentProps {
  onClick?: () => void
  onChange?: (text: string) => void
  full?: boolean
  input?: boolean
}

interface SearchBoxContainerWithInputProps {
  onChange?: (text: string) => void
  debounce?: number
  full?: boolean
}

export const SearchBoxComponent = ({
  onClick,
  onChange,
  full,
  input = false
}: SearchBoxComponentProps) => {
  return (
    <div
      className={concatClass('search-box', full && 'full')}
      role='button'
      tabIndex={0}
      onClick={() => onClick && onClick()}
    >
      <div className='icon'>
        <RiSearchLine></RiSearchLine>
      </div>
      {input && (
        <input
          type='text'
          name='Search'
          placeholder=' '
          id='search-input'
          onChange={ev => onChange && onChange(ev.target.value)}
        />
      )}
      <div className='text'>
        <span>Search...</span>
      </div>
    </div>
  )
}

export const SearchBoxContainerWithInput = ({
  onChange,
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
