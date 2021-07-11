import '@/styles/biography.scss'
import ProfileCloud from '../ProfileCloud'

export const ShortBiography = () => {
  return (
    <div
      className='short-biography'
      role='group'
      aria-label='프로필 정보'
    >
      <div className='text'>
        <div className='text-wrapper'>
          <h1 className='title'>Sochiru</h1>
          <p className='description'>
            Full-Stack Developer (yet), CS Student. Interested in design.
          </p>
        </div>
      </div>
      <div className='profile-icon'>
        <ProfileCloud hide={false}></ProfileCloud>
      </div>
    </div>
  )
}
