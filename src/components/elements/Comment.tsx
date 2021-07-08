import { RootState } from '@/store'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ThemeState } from '@/@types/theme'

interface CommentComponentProps {
  theme?: string
}

export const CommentComponent = ({ theme }: CommentComponentProps) => {
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
    script.setAttribute('theme', theme || 'github-light')

    ref.current.appendChild(script)

    return () => {
      const app = document.querySelector('.utterances')

      if (app) {
        app.parentElement!.removeChild(app)
      }
    }
  }, [ref, theme])

  return <div className='post-comments' ref={ref}></div>
}

export const CommentContainer = () => {
  const theme = useSelector((state: RootState) => state.ui.theme.mode)

  let themeString = 'github-light'

  if (theme === ThemeState.Night) {
    themeString = 'github-dark'
  }

  return <CommentComponent theme={themeString}></CommentComponent>
}

export default CommentContainer
