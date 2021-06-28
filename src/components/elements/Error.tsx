interface ErrorComponentProps {
  error?: Error
  type?: string
}

interface ErrorTemplateComponentProps {
  title: string
  text?: string
  mute?: string
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
    ></ErrorTemplateComponent>
  )
}

export const ErrorTemplateComponent = ({
  title,
  text,
  mute
}: ErrorTemplateComponentProps) => {
  return (
    <div className='post-list-error'>
      <h1 className='icon'>🥺</h1>
      <h3>{title}</h3>
      <p>
        {text} {mute && <span className='mute'>{mute}</span>}
      </p>
    </div>
  )
}
