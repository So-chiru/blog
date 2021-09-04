import '@/styles/biography.scss'
import { RiGithubFill, RiAtLine } from 'react-icons/ri'
import ProfileCloud from '../ProfileCloud'

export const LongBiography = () => {
  const goLink = (href: string) => {
    window.open(href, '_blank')
  }

  const contactLinks = [
    {
      id: 'github',
      icon: <RiGithubFill></RiGithubFill>,
      href: 'https://github.com/So-chiru',
      content: 'So-chiru'
    },
    {
      id: 'email',
      icon: <RiAtLine></RiAtLine>,
      href: 'mailto:sochiru@sochiru.pw',
      content: 'sochiru@sochiru.pw'
    },
    {
      id: 'email',
      icon: <RiAtLine></RiAtLine>,
      href: 'mailto:sochiru@kakao.com',
      content: 'sochiru@kakao.com (alt)'
    }
  ]

  return (
    <div
      className='long-biography'
      aria-live='polite'
      aria-label='개발자 Sochiru의 홈페이지입니다.'
    >
      <div className='text'>
        <div className='text-wrapper'>
          <h1 className='title'>Sochiru</h1>
          <p className='description'>
            make somewhat unorthodox things
          </p>
          <div
            className='contact-links'
            role='group'
            aria-label='Contact Links'
          >
            {...contactLinks.map(v => (
              <div
                key={v.id + v.content}
                className='link'
                role='group'
                onClick={() => goLink(v.href)}
                aria-label={v.id + ' link: ' + v.content.split('').join(' ')}
              >
                <span className='icon' aria-hidden>{v.icon}</span>
                <span className='text'>{v.content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='profile-icon'>
        <ProfileCloud
          animation={true}
          plate={true}
          hide={false}
          big={true}
        ></ProfileCloud>
      </div>
    </div>
  )
}
