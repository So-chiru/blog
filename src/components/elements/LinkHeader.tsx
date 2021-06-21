import '@/styles/header.scss'
import { Link as GoLink } from 'react-router-dom'
import { concatClass } from '@/utils/component'
import { SearchBoxContainer } from './SearchBox'

interface Link {
  name: string
  path: string
  active: boolean
}

interface LinkHeaderCompoenentProps {
  fixed?: boolean
  show?: boolean
  links: Link[]
}

export const LinkHeaderCompoenent = ({
  fixed,
  show,
  links
}: LinkHeaderCompoenentProps) => {
  return (
    <div
      className={concatClass(
        'page-header',
        fixed && 'fixed',
        typeof show === 'boolean' ? (show ? 'show' : 'hidden') : undefined
      )}
    >
      <div className='header-inner'>
        <div className='links-zone'>
          {links.map(link => (
            <GoLink
              key={link.name}
              data-active={link.active}
              className='link'
              to={link.path}
            >
              {link.name}
            </GoLink>
          ))}
        </div>
        <div className='search-zone'>
          <SearchBoxContainer></SearchBoxContainer>
        </div>
      </div>
    </div>
  )
}

export const LinkHeaderContainer = () => {
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

  return <LinkHeaderCompoenent links={links}></LinkHeaderCompoenent>
}
