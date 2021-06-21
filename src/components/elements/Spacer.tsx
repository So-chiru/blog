import '@/styles/spacer.scss'

interface SpacerComponentProps {
  w?: number
  h?: number
  ht?: number
  hb?: number
  flex?: boolean
  children: JSX.Element
}

export const SpacerComponent = ({
  children,
  w,
  h,
  ht,
  hb,
  flex
}: SpacerComponentProps) => {
  return (
    <div
      className='spacer-container'
      style={{
        ['--w' as string]: w && w + 'px',
        ['--h' as string]: h && h + 'px',
        ['--ht' as string]: ht && ht + 'px',
        ['--hb' as string]: hb && hb + 'px'
      }}
      data-flex={flex}
      data-height={typeof ht === 'number' || typeof hb === 'number'}
    >
      {children}
    </div>
  )
}
