import { useEffect, useRef } from 'react'

export const CommentComponent = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref || !ref.current) {
      return
    }

    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.crossOrigin = 'anonymous'
    script.async = true

    script.setAttribute('repo', 'So-chiru/blog-comments')
    script.setAttribute('issue-term', 'url')
    script.setAttribute('theme', 'github-light')

    ref.current.appendChild(script)
  }, [ref])

  return <div className='post-comments' ref={ref}></div>
}

export const CommentContainer = () => {
  return <CommentComponent></CommentComponent>
}

export default CommentContainer
