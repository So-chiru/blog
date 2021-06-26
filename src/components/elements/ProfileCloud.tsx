import { LoaderState } from '@/@types/loader'
import '@/styles/cloud.scss'
import { concatClass } from '@/utils/component'

interface ProfileCloudProps {
  hide?: boolean
  small?: boolean
  big?: boolean
  animation?: boolean
  plate?: boolean
  noFace?: boolean
  state?: LoaderState
  [index: string]: unknown
}

const ProfileCloud = ({
  hide,
  small,
  big,
  animation,
  plate,
  noFace,
  state,
  ...props
}: ProfileCloudProps) => {
  return (
    <div
      className={concatClass('sochiru-cloud-wrapper', animation && 'animation')}
    >
      <svg
        className={concatClass(
          'sochiru-cloud',
          hide && 'hide',
          small && 'small',
          big && 'big'
        )}
        viewBox='0 0 742 437'
        data-state={state}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <path
          d='M22.2817 352.984C62.1264 409.311 195.449 418.298 265.868 410.977C342.512 438.187 454.274 420.459 500.574 408.194C559.611 432.6 647.318 432.753 695.726 387.687C777.67 311.398 714.439 235.776 657.061 213.652C667.999 113.735 594.01 66.9111 545.565 73.7537C499.369 -11.0582 409.945 0.0525946 355.596 38.3475C240.041 15.8753 194.115 59.7274 153.295 127.361C59.0647 120.327 39.9675 203.604 60.4337 235.789C10.4897 258.349 -3.68965 316.269 22.2817 352.984Z'
          fill='white'
          stroke='#42758A'
          strokeWidth='10'
        />
        {!noFace && (
          <>
            <circle cx='261.31' cy='284.909' r='12.3095' fill='#1B6281' />
            <circle cx='390' cy='284.909' r='12.3095' fill='#1B6281' />
            <path
              d='M296 319.6L332.929 314.004L363.702 319.6'
              stroke='#1B6281'
              strokeWidth='6'
            />
            <path
              d='M528.5 96.5997C528.5 130.841 482.765 155.6 443 155.6C403.235 155.6 371 127.841 371 93.5997C371 59.358 403.235 31.5997 443 31.5997C482.765 31.5997 528.5 62.358 528.5 96.5997Z'
              fill='#ECF9FF'
            />
            <path
              d='M630 167.1C630 207.693 593.511 240.6 548.5 240.6C503.489 240.6 481.5 214.6 462.5 173.1C258 93.5997 503.489 93.5997 548.5 93.5997C593.511 93.5997 630 126.507 630 167.1Z'
              fill='#ECF9FF'
            />
            <path
              d='M499.5 374.6C671.9 388.2 710.833 306.766 710.5 259.1C733.333 289.266 748.5 340.1 679.5 394.6C655.5 411.6 592.7 434.4 499.5 405.6C445 417.433 319.8 434 267 405.6C397.4 414.8 477.333 388.766 499.5 374.6Z'
              fill='#C4E1ED'
            />
          </>
        )}
      </svg>
      {plate && <div className='plate'></div>}
    </div>
  )
}

export default ProfileCloud
