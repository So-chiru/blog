import '@/styles/header.scss'
import { Link as GoLink } from 'react-router-dom'
import { concatClass } from '@/utils/component'
import { SearchBoxContainer } from './SearchBox'
import { NightIconContainer } from './NightModeIcon'

interface Link {
  name: string
  path: string
  active: boolean
}

interface LinkHeaderCompoenentProps {
  fixed?: boolean
  show?: boolean
  links: Link[]
  searchBox?: boolean
}

const SearchBox = <SearchBoxContainer></SearchBoxContainer>
const NightIcon = <NightIconContainer></NightIconContainer>

export const LinkHeaderCompoenent = ({
  fixed,
  show,
  searchBox,
  links
}: LinkHeaderCompoenentProps) => {
  return (
    <div
      className={concatClass(
        'page-header',
        fixed ? 'fixed' : 'static',
        typeof show === 'boolean' ? (show ? 'show' : 'hidden') : undefined
      )}
      role='group'
      aria-label='페이지 링크 헤더'
    >
      <div className='header-inner'>
        <div className='links-zone'>
          {links.map(link => (
            <GoLink
              key={link.name}
              data-active={link.active}
              aria-current={link.active ? 'page' : undefined}
              className='link'
              to={link.path}
            >
              {link.name}
            </GoLink>
          ))}
        </div>
        <div className='control-zone'>
          {typeof searchBox === 'undefined' || searchBox === true
            ? SearchBox
            : undefined}
          {NightIcon}
        </div>
      </div>
    </div>
  )
}

interface LinkHeaderContainerProps {
  searchBox?: boolean
}

export const LinkHeaderContainer = ({
  searchBox
}: LinkHeaderContainerProps) => {
  const links: Link[] = [
    { name: 'About', path: '/', active: true },
    {
      name: 'Blog',
      path: '/blog',
      active: false
    }
  ].map(v => {
    v.active = window.location.pathname == v.path

    return v
  })

  return (
    <LinkHeaderCompoenent
      links={links}
      searchBox={searchBox}
    ></LinkHeaderCompoenent>
  )
}
