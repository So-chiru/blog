interface ErrorComponentProps {
  error?: Error
  type?: string
}

interface ErrorTemplateComponentProps {
  title: string
  text?: string
  mute?: string
  assertive?: boolean
}

const errorMessages = [
  '오오오오오오오오류',
  '길을 잃었어요...',
  'E R R O R',
  '에에에에에에러',
  '🔥🔥🔥🔥🔥🔥🔥🔥',
  'Time to say goodbye'
]

export const ErrorComponent = ({
  error,
  type = '게시글 목록'
}: ErrorComponentProps) => {
  return (
    <ErrorTemplateComponent
      title={errorMessages[Math.floor(Math.random() * errorMessages.length)]}
      text={type + '을 가져오지 못했어요.'}
      mute={error && error.message}
      assertive={true}
    ></ErrorTemplateComponent>
  )
}

export const ErrorTemplateComponent = ({
  title,
  text,
  mute,
  assertive
}: ErrorTemplateComponentProps) => {
  return (
    <div
      className='post-list-error'
      aria-live={assertive ? 'assertive' : undefined}
      aria-label={
        (text ? '오류: ' + text + ', ' : '') +
        (mute ? '자세한 사항: ' + mute : '')
      }
    >
      <h1 className='icon'>🥺</h1>
      <h3>{title}</h3>
      <p id='error-text'>
        {text} {mute && <span className='mute'>{mute}</span>}
      </p>
    </div>
  )
}
