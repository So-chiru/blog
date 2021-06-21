interface ErrorComponentProps {
  error?: Error
}

export const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <div className='post-list-error'>
      <h1 className='icon'>🥺</h1>
      <h3>오오오오오오오오류</h3>
      <p>
        게시글 목록을 가져오지 못했어요.{' '}
        <span className='mute'>{error && error.message}</span>
      </p>
    </div>
  )
}
