import '@/styles/spacer.scss'

interface SpacerComponentProps {
  width?: string | number
  w?: string | number
  h?: string | number
  ht?: string | number
  hb?: string | number
  template?: string
  flex?: boolean
  children: JSX.Element
}

const stringlize = (value?: string | number) => {
  if (typeof value === 'undefined') {
    return undefined
  }

  let result = value

  if (typeof value === 'number') {
    result = value + 'px'
  }

  return result as string
}

export const SpacerComponent = ({
  children,
  width,
  w,
  h,
  ht,
  hb,
  template,
  flex
}: SpacerComponentProps) => {
  return (
    <div
      className='spacer-container'
      data-template={template}
      style={{
        ['--width' as string]: stringlize(width),
        ['--w' as string]: stringlize(w),
        ['--h' as string]: stringlize(h),
        ['--ht' as string]: stringlize(ht),
        ['--hb' as string]: stringlize(hb)
      }}
      data-flex={flex}
      data-height={typeof ht !== 'undefined' || typeof hb !== 'undefined'}
    >
      {children}
    </div>
  )
}
