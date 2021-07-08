import '@/styles/header.scss'
import { concatClass } from '@/utils/component'
import { useEffect, useState } from 'react'
import ProfileCloud from './ProfileCloud'
import { SearchBoxContainer } from './SearchBox'
import { NightIconContainer } from './NightModeIcon'

interface HeaderCompoenentProps {
  fixed?: boolean
  logoClick?: () => void
  show?: boolean
  background?: boolean
}

export const HeaderCompoenent = ({
  fixed,
  logoClick,
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
      aria-hidden={!show}
    >
      <div className='header-inner'>
        <div
          className='logo-zone'
          onClick={logoClick}
          data-clickable={!!logoClick}
        >
          <ProfileCloud
            hide={false}
            small={true}
            style={{
              '--width': '80px',
              '--height': '37px'
            }}
          ></ProfileCloud>
        </div>
        <div className='control-zone'>
          <SearchBoxContainer></SearchBoxContainer>
          <NightIconContainer></NightIconContainer>
        </div>
      </div>
      {background && <div className='header-background'></div>}
    </div>
  )
}

interface HeaderContainerProps {
  fixed?: boolean
  background?: boolean
  onLogoClick?: () => void
  hideUntil?: number
}

export const HeaderContainer = ({
  fixed,
  hideUntil,
  onLogoClick,
  background
}: HeaderContainerProps) => {
  const [scrollShow, updateScrollShow] = useState<boolean>(
    hideUntil ? window.scrollY > hideUntil : true
  )

  const logoClick = () => {
    if (onLogoClick) {
      onLogoClick()
    }

    if (hideUntil && window.scrollY > hideUntil) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

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
      logoClick={logoClick}
      show={scrollShow}
      background={background}
    ></HeaderCompoenent>
  )
}
