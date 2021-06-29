import '@/styles/loadspinner.scss'

export const LoadSpinner = () => {
  return (
    <div className='load-spinner-wrapper' aria-live='assertive' aria-label='페이지를 로딩 중입니다.'>
      <div className='load-spinner'></div>
    </div>
  )
}
