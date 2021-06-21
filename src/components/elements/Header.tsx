import '@/styles/header.scss'
import { concatClass } from '@/utils/component'
import { useEffect, useState } from 'react'
import ProfileCloud from './ProfileCloud'
import { SearchBoxContainer } from './SearchBox'

interface HeaderCompoenentProps {
  fixed?: boolean
  show?: boolean
  background?: boolean
}

export const HeaderCompoenent = ({
  fixed,
  show,
  background
}: HeaderCompoenentProps) => {
  return (
    <div
      className={concatClass(
        'page-header',
        fixed && 'fixed',
        typeof show === 'boolean' ? (show ? 'show' : 'hidden') : undefined,
        background && 'background'
      )}
    >
      <div className='header-inner'>
        <div className='logo-zone'>
          <ProfileCloud
            hide={false}
            style={{ width: '80px', height: '37px' }}
          ></ProfileCloud>
        </div>
        <div className='search-zone'>
          <SearchBoxContainer></SearchBoxContainer>
        </div>
      </div>
      {background && <div className='header-background'></div>}
    </div>
  )
}

interface HeaderContainerProps {
  fixed?: boolean
  background?: boolean
  hideUntil?: number
}

export const HeaderContainer = ({
  fixed,
  hideUntil,
  background
}: HeaderContainerProps) => {
  const [scrollShow, updateScrollShow] = useState<boolean>(
    hideUntil ? window.scrollY > hideUntil : true
  )

  if (hideUntil) {
    const scroll = () => {
      const scrollOver = window.scrollY > hideUntil

      if (!scrollShow && scrollOver) {
        updateScrollShow(true)
      } else if (scrollShow && !scrollOver) {
        updateScrollShow(false)
      }
    }

    useEffect(() => {
      // document 요소가 스크롤될 때 수행할 동작, 하위 요소에서의 스크롤은 호출되지 않음.
      window.addEventListener('scroll', scroll)

      // TODO : iOS 에서는 스크롤이 끝났을 때만 호출 됨. touchstart 이벤트를 사용하여 터치 시 반응하도록 구현하기.

      return () => {
        window.removeEventListener('scroll', scroll)
      }
    })
  }

  return (
    <HeaderCompoenent
      fixed={fixed}
      show={scrollShow}
      background={background}
    ></HeaderCompoenent>
  )
}
