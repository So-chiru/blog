interface ErrorComponentProps {
  error?: Error
  type?: string
}

export const ErrorComponent = ({
  error,
  type = '게시글 목록'
}: ErrorComponentProps) => {
  return (
    <div className='post-list-error'>
      <h1 className='icon'>🥺</h1>
      <h3>오오오오오오오오류</h3>
      <p>
        {type}을 가져오지 못했어요.{' '}
        <span className='mute'>{error && error.message}</span>
      </p>
    </div>
  )
}
